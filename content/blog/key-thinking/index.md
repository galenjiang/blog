---
title: 关于react key的思考（过期）
date: "2016-05-01T22:12:03.284Z"
description: "这个问题的思考来源于多年前对半受控组件思考..."
---

### 起源

这个问题的思考来源于多年前对半受控组件思考，数据既收到 props 的影响又受到 internal state 的影响，目的是把 prop 的“复制”到 state
直接来看代码

```javascript
class EmailInput extends Component {
  state = { email: this.props.email }

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />
  }

  handleChange = event => {
    this.setState({ email: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ email: nextProps.email })
  }
}
```

这是一个 react 官方提供的例子，这个例子原本意图是在 props 改变时重置 state 的 email， 而这段代码无论在父组件 render 还是内部 state 的更新都会导致 email 重置，这段代码彻底地错误了。

我们来看下经过更新的例子

```javascript
class EmailInput extends Component {
  state = {
    email: this.props.email,
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.email !== this.props.email) {
      this.setState({
        email: nextProps.email,
      })
    }
  }

  // ...
}
```

更新后的代码在变更时，检测 prop 有没有更改，如果变动了，则更新 state
这是一个很明显的反模式。官方给出的可能出错的情况，当在不同用户之间切换，email 可能是相同的，这时 prop 不发生变化，也就无法重置了。

### react 官方解决方式

为了彻底解决这个问题的方法有两种：

第一种

```javascript
<EmailInput defaultEmail={this.props.user.email} key={this.props.user.id} />
```

移除对属性的变更，用 key 来检索组件，当 key 变更时，重新 mount 组件，

当然组件初始化是非常昂贵的操作，这时候有更进一步的解决方式，检测 email 变动变为检测 userId 的这个 unique 的值变动，不过代码就长了很多

```javascript
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID,
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail,
      }
    }
    return null
  }

  // ...
}
```

第二种方式

```javascript
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
  }

  resetEmailForNewUser(newEmail) {
    this.setState({ email: newEmail })
  }

  // ...
}
```

直接用命令式的方式代替函数式的方式，要更新时调用实例方法。

### 小结

这官方给出的两种方式其实并不是真的让代码写得舒服，
第一种，莫名多了一个 key 或 userId，很明显，这几个值对组件业务层来说是多余的，是否能去掉呢？
第二种，用命令式的方式去写代码，有强迫症的同学或许接受不了，其实很多库都是以这种方式来写的。

react 的理念， UI = render(data)， 很显然用这两种不是很完美的代码代码组织方式好像无法达到这个理念，组件与组件之间通信是很割裂的

### 再出发

当我们局限在单个框架中，视角是很局限的，于是我研究了下 angular 的写法

```javascript
import { Component } from '@angular/core';

import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-hero-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>
    <p>Message: {{ message$ | async }}</p>
    <button (click)="resend()">Resend</button>`,
})
export class HeroAsyncMessageComponent {
  message$: Observable<string>;

  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];

  constructor() { this.resend(); }

  resend() {
    this.message$ = interval(500).pipe(
      map(i => this.messages[i]),
      take(this.messages.length)
    );
  }
}
```

angular 有个 async pipe，这个 pipe 是不纯的，可以把 observable 进行展开，这里 observable 是个流的概念。

> 抱怨一下，又多了一个流的, 难道就不能统一概念吗？

而 react 在 16.8 又正式上线了 hook 功能，结合这两个特性就有了进一步改进的可能性，

```javascript
function Input(props) {
  const input = useRef(null)
  const input$ = Observable.fromEvent(input.current, 'input')
  const value$ = props.defaultEmailObservable.merge(input$)
  // 伪代码
  const [value] = useObservable(value$)

  return <input ref={input} value={value} />
}
```

通过这样的修改，我们不再纠结了。

### 新的问题

observable 毕竟是一个新的概念，虽然是函数式的，但总觉的和我们 UI = render(data)的理念格格不入，这里要注意是 data， 而不是 state。

而且对于 observable 多次输入的同一个值，会造成重复计算，如何才能避免，怎么才能区分这两者的界限呢？

```javascript
function Hello({ greeting$, name$ }) {
  const [greeting] = useObservable(greeting$)
  const [name] = useObservable(name$)
  return (
    <span>
      {{ greeting }} {{ name }}
    </span>
  )
}
```

从这例子我们看出，不能每个 prop 都用 observable 来进行改写，会造成浪费

### 重新理解 UI

其实，世间万物都是状态机，一个状态对应一个样子，不可能出现两个状态（量子力学不考虑），之所以出现同一 prop 产生不同 view，是因为组件内部维护了一套状态，
UI = render(prop, state)还是成立的。产生非受控组件的错觉是因为同一时间内 view 状态不由 prop 来决定，组件有副作用的，组件不等于 UI。

那如何选择用 observable 还是 primary value 作为 prop 传入组件，

1. prop 对应 view，用 primary value
2. prop 只改变内部状态，用 observable 或其他方式

### 补充

1. angular 的 async pipe 是 dsl，区别于 js，做一些 js 无法做的事情
2. react 的 container 对应 angular 的 service，做到区别于 component 或 view 可以用高阶函数来包
3. ...
