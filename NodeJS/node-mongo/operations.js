
// Modules
const assert = require('assert');

// CRUD
function insertDocument(db, document, collection) {
    const coll = db.collection(collection);

    return coll.insert(document);
}

function findDocuments(db, collection) {
    const coll = db.collection(collection);

    return coll.find({}).toArray();
}

function updateDocument(db, document, update, collection) {
    const coll = db.collection(collection);

    return coll.updateOne(document, {$set: update}, null);
}

function removeDocument(db, document, collection) {
    const coll = db.collection(collection);

    return coll.deleteOne(document);
}

// Export module
module.exports = {
    insertDocument,
    findDocuments,
    updateDocument,
    removeDocument
};
