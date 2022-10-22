# youtube-irmao-mais-velho-app-agendamento

Course Youtube: O irmão mais velho: [https://www.youtube.com/watch?v=04QoJx7r_XQ&amp;list=PL_Axpn7FrXHR3nZiQPHFClLu6VByhWkzG&amp;index=2]()

> **Website and App mobile:** React, React native, Node, Mongodb and Figma (Design)

##### RESOURCES:

1. figma: [https://www.figma.com/file/2Sn6OqRkXBPhy5IitbBz3c/app-agendamento?node-id=0%3A1]()
2. coolors: [https://coolors.co/palettes/trending]()
3. design:
   1. Search (app booking): [https://br.pinterest.com/ideas/]()
   2. [https://mobbin.com/dictionary]()
   3. [https://ui8.net/]()
4. DB UML: [https://app.diagrams.net/]()

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
