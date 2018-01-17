
const MongoClient   = require('mongodb').MongoClient;
const assert        = require('assert');
const dbOper        = require('./operations');

const url       = 'mongodb://mongo:27017';
const dbName    = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('\n- Connected correctly to server\n');

    const db            = client.db(dbName);
    const collection    = "dishes";

    dbOper.insertDocument(db, {name:"asd", description:"dsa"}, collection, (result) => {
        console.log('\n- Insert document: ', result.ops);

        dbOper.findDocuments(db, collection, (docs) => {
            console.log('\n- Found documents: ', docs);

            dbOper.updateDocument(db, {name: "asd"}, {description:"123"}, collection, (result) => {
                console.log('\n- Updated document: ', result.result);

                dbOper.findDocuments(db, collection, (docs) => {
                    console.log('\n- Found documents: ', docs);

                    db.dropCollection(collection, (result) => {
                        console.log('\n- Dropped collection\n');

                        client.close();
                    });
                });
            });
        });
    });

});
