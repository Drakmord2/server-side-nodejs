
// Modules
const assert = require('assert');

// CRUD
function insertDocument(db, document, collection, callback) {
    const coll = db.collection(collection);

    coll.insert(document, (err, result) => {
        assert.equal(err, null);

        console.log('Inserted ' + result.result.n + ' documents into the collection ' + collection);

        callback(result);
    });
}

function findDocuments(db, collection, callback) {
    const coll = db.collection(collection);

    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        callback(docs);
    });
}

function updateDocument(db, document, update, collection, callback) {
    const coll = db.collection(collection);

    coll.updateOne(document, {$set: update}, null, (err, result) => {
        assert.equal(err, null);

        console.log('\nUpdated the document with update ', update);

        callback(result);
    });
}

function removeDocument(db, document, collection, callback) {
    const coll = db.collection(collection);

    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);

        console.log('Removed the document ', document);

        callback(result);
    });
}

// Export module
module.exports = {
    insertDocument,
    findDocuments,
    updateDocument,
    removeDocument
};
