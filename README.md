# Server-side NodeJS
Repository for exercises of Coursera's Server-side NodeJS course.

https://www.coursera.org/learn/server-side-nodejs

## Contents

**Week 1**
- node-examples (Intro to Node.js)
- node-http     (Node.js HTTP server)
- node-express  (Express.js server)

**Week 2**
- conFusionServer (Express Generator)

## Docker
A Docker development environment with Node.js, MongoDb and all necessary Node modules is available.

You can set it up by executing:

```bash
$ cd devops/
$ docker-compose up --build
```

To enter the Node container use:

```bash
$ docker exec -it devops_node_1 bash
```

**Network**
- node  @ port 3000 
- mongo @ port 27017
