FROM node:20-alpine AS dependence
WORKDIR /app
RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", "/app/"]
VOLUME [ "/app/node_modules" ] # 构建镜像install时无法mount
RUN pnpm install
EXPOSE 8080

FROM dependence AS dev
VOLUME [ "/app" ]
CMD [ "pnpm", "dev" ]


FROM dependence
COPY . .
RUN npm install pm2 -g
CMD ["pm2-runtime", "start", "--name", "blog", "pnpm", "--", "prod"]

