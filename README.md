# EPAY - ReconciliationApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

1. Tech:
  - Angular
    ## Development server
    Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
    ## Build
    Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
    ## Running unit tests
    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). 
  - UI: Merterial with responsive

2. Architect: Clean Architecture
- core: Business login. Last layer
- data: Data model, exchange with API. This contains the implementaions of the abstract repositories from core
- infrastructure: implementaions of the abstract services that are required in the core.
- presentation: UI

3. Target:
  - Build app with clean of codes
  - Build an responsive app
