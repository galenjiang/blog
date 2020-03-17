---
title: 基于docker的开发环境
date: "2020-03-17T08:57:14.323Z"
description: "docker火了好几年了，但一直没有用于实际开发流程中, 这次重新梳理了整个流程..."
---

一两年前看了下文档尝试了下几个demo，看到docker swarn，感觉有点麻烦了，觉得平时也用不到分布式这一块，所以就仅仅浅尝辄止了，开发中也没有用到。最近在做puppeteer时，用云服务器做了服务，发现centos的坑也是挺多的，如果能像node不需要考虑适配环境，用更多时间来专注于业务开发了，于是又开始折腾起docker了
说干就干，首先确定目标吧，不然又像之前一样做了几个demo就结束了，对实际开发并没有什么帮助，初步定的目标能让我的puppeteer项目随时可以拉一个镜像来直接开发，这样需要发布自己的镜像。

### docker中的概念
首先介绍下docker中的专有名词：镜像image，容器container，高级一点的还有，分卷volume，网络network等等，通常这一部分配置的比较少，还有一部分docker swarm涉及分布式了，我也没打算学，另外也有k8s这个大杀器，一般生产中会用它来代替docker swarm，也没有必要学。

其实概念也挺简单的。镜像是固化的文件，有很多预设的环境，例如ubuntu，node，mysql各种各样的环境，一般没有镜像都不会太大，因为提供的服务都比较简单，镜像架构都是分层的，只打包属于服务的那一部分。另外我们可以把很多服务组合compose起来，这个后面介绍，镜像一般会发布在公网上，供他人下载使用，自己也可以制定一些个人的特殊化的镜像，以后要用直接用镜像，免去去了再次安装环境的麻烦。有了镜像后，我们就可以根据镜像来生成容器，容器是镜像的实例，可以这么类比，镜像就是java中的类，而容器就是实际化后的类。

### 制作镜像几种方式，
1. 根据镜像起一个容器然后进入容器安装依赖
```bash
docker run -v -it —name container-name -d image-name command # 根据基础镜像起一个容器，到容器里面把依赖一点一点安装好
docker commit container-id # 持久化容器，保存为镜像
docker tag container-id tag-name # 打tag
```

2. 通过dockerfile构建镜像, 定义在Dockerfile里面
```sh
FROM galenjiang/ubuntu-toolchain:latest AS DEV
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm install
CMD ["npm", "start"]
```
常见的配置如上，```FROM``` 作为基础镜像扩展，```WORKDIR```工作目录，没什么好说的，```EXPOSE```对外暴露的端口，docker对外的权限是白名单的方式，控制好端口一切都ok，```CMD``` 提供运行时初始命令预设，如果在启动容器时没有指定，会作为默认命令启动，```COPY```根据构建镜像提供的上下文拷贝复制文件到docker，.dockerignore可以忽略一些敏感文件或为了操作方便而不想放进上下文中时可以另外配置。```RUN```构建过程中执行的命令。 其中每一个命令都作为一个layer，可以把多个RUN合并在一起减少层数。
```sh
docker image build -t tag-name context
```
发布镜像前必须为镜像打一个适合的tag namespace/tag-name:version
```sh
docker image push image-name
```
### 开发流程
有了自己的镜像了，这是直接用
```docker run image-name —rm```
每次运行后都进行回收，因为container是作为一个临时的容器而不是持久化存在的，镜像才是。 一般的作业流程是根据镜像起一个容器，加载外部源代码volume完成后删除容器，如果需要更新依赖可以在原来的镜像上commit或者，更新dockerfile

### 碰到的问题
当然实际情况并不如设想的那么理想，环境远比这个复杂
1. 假如是多服务的环境，怎么办，例如mysql和node没有官方的镜像同时提供两种环境，那更复杂呢，难道要自己去一个一个安装吗？
2. 碰到node的项目，项目依赖加载后在项目目录里面，然后源代码volume加载完，居然把依赖给覆盖了，在就只能把volume加载在固定的文件夹下面，实际项目目录里还有很多配置文件，这就要动项目结构了，这个明显不合理
3. 开发测试，生产不同的环境怎么配置?

### docker-compose
这时，docker-compose就大显身手了，让我们先看下配置，定义在docer-compose.yml
```sh
version: "3.7"
services:
  webapp:
    build: 
      context: .
      target: dev
    command: npm start
    ports:
      - '8088:3000'
    volumes:
      - .:/app
      - puppeteer_node_modules:/app/node_modules
    depends_on: 
      - mysql
  mysql:
    image: mysql:5.7.26
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456
volumes:
  puppeteer_node_modules:
networks: 
  - my-network
```

compose定义了一些deps，让每个container产生依赖，并且有序的启动，本来为了启动docker-container需要手打命令行，毕竟大神也不可能每次都记住命令，更别说我们这些平时偶尔用用docker的非运营人员，有了compose的配置文件少了很多操作
简单介绍下service是关于几个容器，这些容器根据depends_on来关联，当运行```docker-compose up```时，服务被一个一个依次启动起来，只有depends_on下面的服务都起来了，有依赖的服务的才能启动。

在运行时定义的command, ports端口映射，volume开发源代码加载都可以定义在配置文件中。

这里要特别提一点, build:target: dev, 这个配置项定义了在单个docker配置文件里可以制定不同的镜像，而target可以为开发定制的镜像阶段就进行暂停。提供不同的环境镜像。

而之前的依赖覆盖问题，也可以用多个volumes来解决，建立非对应本地文件的映射卷，把镜像中的路径暴露出来。

### 常用命令
```sh
docker run -it --rm ubuntu /bin/bash
docker run -it -d -v --rm $PWD:/app/ node npm start

docker pull image
docker image ls
docker tag source_image namespace/target:0.0.1

docker ps -a
docker container ls
docker rm container_name
docker exec -it container_name sh
docker start|stop container_name
docker commit
docker-compose run
docker-compose up / down
```