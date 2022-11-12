# NODE BACKEND

##### DEPENDENCIES:

1. Nodejs installed
2. Mongodb installed
   * Tutorial to Install (Ubuntu 2204): [https://techviewleo.com/install-mongodb-on-ubuntu-linux/]()
3. Libs:
   * A node.js module for parsing incoming HTML form data:
     * `busboy, busboy-body-parser, connect-busboy`
   * Upload file: `express-busboy`
   * Geo Location: `turf`
   * JS tool: `lodash`
   * HTTP Client based on promise: `axiosMongoDB object modeling tool`
   * MongoDB object modeling tool: `mongoose`
   * Manipulating and formatting dates: `moment`

##### SETTINGS:

BACKEND

1. Rename env.EXAMPLE to .env:
   1. Populate with the values defined for your production environment.
   2. .env variables feed src/config/. Constant of config/ feeds the entire project:
      * import the configuration constants from config/
      * Do not use: process.env.*
      * See examples at: src/utils/aws.api.js
      * After creating a variable in .env, add manually in config/
2. next...

##### ROUTES:

* Salão:

  1. GET: /
  2. GET BY ID: /
  3. POST:
  4. PUT:
  5. DELETE:
* Serviço:

  1. GET: /
  2. GET BY ID: /
  3. POST:
  4. PUT:
  5. DELETE:
* Colaborador:

  1. GET: /
  2. GET BY ID: /
  3. POST:
  4. PUT:
  5. DELETE:
* Horario:

  1. GET: /
  2. GET BY ID: /
  3. POST:
  4. PUT:
  5. DELETE:
* Agendamento:

  1. GET: /
  2. GET BY ID: /
  3. POST:
  4. PUT:
  5. DELETE:

---
