FROM node:20-alpine AS dependence
WORKDIR /app
RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", "/app/"]
VOLUME [ "/app/node_modules" ]
RUN pnpm install
EXPOSE 3000

FROM dependence AS dev
VOLUME [ "/app" ]
CMD [ "pnpm", "start:dev" ]


FROM dependence
COPY . /app/
CMD [ "pnpm", "prod" ]

