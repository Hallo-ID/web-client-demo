# halloid-aurelia-mdc-template

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/cli-bundler

## Material Web Components

This projects uses 
[Material Web Components](https://material-components.github.io/material-components-web-catalog/#/) as 
template standard for HalloID platforms. The integration is made with the library 
[Aurelia MDC](https://aurelia-ui-toolkits.github.io/aurelia-mdc-web/#/). 

## Run dev app

Run `au run`, then open `http://localhost:9000`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 8888`.

To change dev server host, do `au run --host 127.0.0.1`


**PS:** You could mix all the flags as well, `au run --host 127.0.0.1 --port 7070 --open`

## Build for production

Run `au build --env prod`.

## Unit tests

Run `au test` (or `au jest`).

To run in watch mode, `au test --watch` or `au jest --watch`.


## Build for Docker

This is as simple as running a command:

`yarn docker:build` or `npm run docker:build`

if you want to bring up an instance on your machine run:

`yarn docker:start` or `npm run docker:build`

to stop the previously started instance:

`yarn docker:stop` or `npm run docker:stop`

## Creating new Projects

This project is configured to work with Aurelia MDC plugin, so is recommended to fork the current repository
and start creating the new web application from this template to avoid re-configure the plugin.
