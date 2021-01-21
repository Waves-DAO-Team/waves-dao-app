# Waves Association DAO

[![Linter](https://github.com/rieset/waves-grants/workflows/Linter/badge.svg)](https://github.com/rieset/waves-grants/actions)
[![Testing](https://github.com/rieset/waves-grants/workflows/Testing/badge.svg)](https://github.com/rieset/waves-grants/actions)

Waves DAO is a tool that facilitates the application and distribution of grants
provided by the Waves Association.

Thanks to Waves DAO, members of the Waves Association and its working groups can
manage the grant distribution process and transparently vote for the applicants.

## Original DAO Contracts

- [Management membership](https://github.com/vlzhr/WavesDAO/blob/master/dao-membership.ride)

  Waves Association DAO member management

- [Disruptive Tech Grants](https://github.com/vlzhr/WavesDAO/blob/master/disruptive-grant.ride)

  Disruptive Tech Grants awarded to implement tasks dedicated to developing
  solutions that meet the rapidly accelerating Waves ecosystem’s needs.

- [Interhack Grants](https://github.com/vlzhr/WavesDAO/blob/master/interhack-grant.ride)

  Interhack Grants awarded for building innovative solutions at hackathons
  in accordance with assignments provided by the Waves Association.

- [Web3 Community Development Grants](https://github.com/vlzhr/WavesDAO/blob/master/web3-grant.ride)

  Web 3.0 Development Grants can be proposed by the community and awarded to
  the teams that foster mass adoption of blockchain technology.

## Architecture

Structure diagram:
![structure](https://raw.githubusercontent.com/rieset/waves-grants/dev/contracts/structure-diagram.png?token=AE6NWSYPSYPVIIKCQB6S7YC75HOLE)

Waves DAO is a client-server application using blockchain technology
based on smart contacts. Frontend uses Angular, Angular material and Signer.

File structure applications are:

- /pages - directory with the main pages of the application
- /ui - ui elements located here
- /services - application services located here
- /libs - directory where application libraries, pipes, decorators, directives
and more are located.

Main application services:

- ContractService - this service is responsible for interacting with contracts.
This service receives data, prepares and formats it,
as well as switches between contracts.
- InterhackContractService, CommunityContractService, CommonContractService -
services responsible for working with different types of contracts.
CommonContractService combines common contract methods.
- SignerService - service responsible for interaction with [Signer](https://github.com/wavesplatform/signer)
- UserService - service responsible for the current user, his access and
participation in grants.

## Starting project

```bash
    git clone https://github.com/rieset/waves-grants.git
    cd waves-grants
    npm i
    ng serve
```

## Adding modules

You can use the following commands to automatically generate modules.

Create component

```bash
    ng g m my-component
    ng g c my-component
```

Create pages

```bash
    ng g m pages/my-other-page --routing
    ng g c pages/my-other-page
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

## Running tests and lint

To run the tests under Node you will need tap installed (it's listed as a
`devDependencies` so `npm install` from the checkout should be enough), then do

```bash
    ng lint
    npm tests
```
