# Waves Association DAO

[![Linter](https://github.com/rieset/waves-grants/workflows/Linter/badge.svg)](https://github.com/rieset/waves-grants/actions)
[![Testing](https://github.com/rieset/waves-grants/workflows/Testing/badge.svg)](https://github.com/rieset/waves-grants/actions)

## Original DAO Contracts

- [Managment membership](https://github.com/vlzhr/WavesDAO/blob/master/dao-membership.ride)

    Waves Association DAO member management

- [Disruptive Tech Grants](https://github.com/vlzhr/WavesDAO/blob/master/disruptive-grant.ride)

    Disruptive Tech Grants are awarded to implement tasks dedicated to
    developing solutions that meet the rapidly accelerating Waves ecosystem’s
    needs.

- [Interhack Grants](https://github.com/vlzhr/WavesDAO/blob/master/interhack-grant.ride)

    Interhack Grants are awarded for building innovative solutions at
    hackathons in accordance with assignments provided by the Waves Association.

- [Web3 Community Development Grants](https://github.com/vlzhr/WavesDAO/blob/master/web3-grant.ride)

    Web 3.0 Development Grants can be proposed by the community and are awarded
    to the teams that foster mass adoption of blockchain technology.

## Modules

Create component in application

```bash
    ng g m my-component
    ng g c my-component
```

Create pages

```bash
    ng g m page/my-other-page --routing
    ng g c page/my-other-page
```

Create ui component

```bash
    ng g m my-ui-component --project=ui
    ng g c my-ui-component --project=ui --export
```

Create library module

```bash
    ng g m my-lib-module --project=libs
```

Create service

```bash
    ng g m my-service --project=services
    ng g s my-service/my-service --project=services

    # and create my-service.model.ts in directory service
```

## Local start Github [super linter](https://github.com/github/super-linter)

Used adopted version for Typescript [rieset/super-linter-standardx](https://hub.docker.com/repository/docker/rieset/super-linter-standardx)

load docker image on local machine

```bash
    docker pull rieset/super-linter-standardx:v1
```

Start linter

```bash
    yarn lint:all
```

## Install

Run `yarn install`

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will
be stored in the `dist/` directory.
Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check
out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
