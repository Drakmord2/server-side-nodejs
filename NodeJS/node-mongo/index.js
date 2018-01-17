
const MongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');
const dbOper        = require('./operations');

const url       = 'mongodb://mongo:27017';
const dbName    = 'conFusion';

MongoClient.connect(url)
    .then( (client) => {
        console.log('\n- Connected correctly to server\n');

        const db            = client.db(dbName);
        const collection    = "dishes";

        const document = {name:"asd", description:"dsa"};

        dbOper.insertDocument(db, document, collection)
            .then( (result) => {
                console.log('- Inserted document: \n', result.ops);

                return dbOper.findDocuments(db, collection);
            })
            .then( (docs) => {
                console.log('\n- Found documents: \n', docs);

                const findBy    = {name: "asd"};
                const update    = {description:"123"};

                return dbOper.updateDocument(db, findBy, update, collection);
            })
            .then( (result) => {
                console.log('\n- Updated document: \n', result.result);

                return dbOper.findDocuments(db, collection);
            })
            .then( (docs) => {
                console.log('\n- Found documents: \n', docs);

                return db.dropCollection(collection);
            })
            .then( (result) => {
                console.log('\n- Dropped collection\n');

                return client.close();
            })
            .catch(console.log);

    })
    .catch(console.log);
