# Vue chat
> A simple chat web

Check out [backend repository](https://github.com/vinicius-batista/elixir-chat) at github.

## Installing / Getting started

* Serve with hot reload at localhost:8080
```bash
docker-compose up dev
```

* build for production with minification
```bash
npm run build
```
or

```bash
docker-compose run dev npm run build
```

* NGINX preview of 'npm run build' contents 
```bash
docker-compose up preview
```

## Developing

### Built With
* [Vue.js](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/)
* [Vue-Apollo](https://github.com/Akryum/vue-apollo)
* [Ramda](http://ramdajs.com/)

### Prerequisites
* docker and docker-compose
or
* nodejs and npm

## Style guide

This project use Standard code style. For check the code:
```bash
npm run lint
```
