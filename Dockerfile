FROM node:8.11

RUN npm i -g @vue/cli

WORKDIR /app
EXPOSE 8080
