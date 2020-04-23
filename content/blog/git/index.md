---
title: git基本操作及深入
date: "2020-04-23T04:39:03.001Z"
description: "复习了一下git的基本操作，及一些常用git命令..."
---

在工作中一直用着git，平时有问题一直在google上搜解决方式，只是在脑中做了点总结，并没有落实到自己的小本本上，这次重新总结了下git基础和常用命令

### 术语
- Commit Hash
- Branch
- HEAD
- Index
- Working Directory

### 初始化
```
git init
git clone [--depth 1] --branch branch_name git_url
```
### 简单操作
```
git add -A # 所有文件更新到Index
git add -u # 把加入track的文件更新到Index
git commit -m "description"
git commit -am # 修改上次提交记录 或者git reset --soft HEAD~ & git commit -m

git checkout branch # 移动HEAD
git diff [--cached] # 对比HEAD和Index 或者 对比Index和Working Directory 
```

### 取回远程仓库信息
```
git fetch remote branch
```

### 查看版本提交信息
```
git show [remote | hash | branch]
```

### git rebase
```bash
dev:
git rebase master   # 合并到master分支上去，产生新的hash
git add -A          # 产生冲突后不要进行提交
git --continue      # 解决冲突后继续完成rebase

git checkout master # 切换到master
git rebase dev # or git reset --hard dev ?! master落后dev,合并到dev的版本
```
### 重置揭秘
git 内部维护三棵树，
1 第一棵 HEAD -> [branch | hash]
2 第二棵树 Index 索引
3 第三棵树 WorkSpace 工作区
#### git reset
```
git reset [--soft | mixed | hard] [hash | branch] [file_path]

```
不带路径 
- soft 移动HEAD -> branch
- mixed 移动Index (默认方式)
- hard 移动 Working Directory

带路径
- 跳过移动HEAD
- 更新Index 不处理Working Directory （这里有个很神奇的点， git diff & git diff --cached 是反过来的操作）

#### git checkout
不带路径，只移动HEAD

带路径
- 跳过移动HEAD
- 更新Index
- 更新Working Directory (一般都会做这一步)

### gitsubmodule
* 添加子仓库  
git submodule add repo_url directoy/submodule-repo

* 初始化  
git submodule init
git submodule update

* 更新子仓库  
git submodule update --remote submodule-repo