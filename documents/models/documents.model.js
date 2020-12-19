const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Documentschema = new Schema({
title : String,
description : String,
date : Date,
status : Boolean,
type : Number,
projectId : String,
enterpriseId : String,

}, { timestamps: true }
);
Documentschema.virtual('id').get(function () {
return this._id.toHexString();
});
Documentschema.set('toJSON', {
virtuals: true
});

Documentschema.findById = function (cb) {
return this.model('Documents').find({id: this.id}, cb);
};
const Documents = mongoose.model('Documents', Documentschema);
exports.findById = (id) => {
return Documents.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createDocuments = (DocumentsData) => {
const documents = new Documents(DocumentsData);
return documents.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Documents.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, documents) {
if (err) {
reject(err);
} else {
resolve(documents);
}
})
});
};
exports.patchDocuments = (id, DocumentsData) => {
return new Promise((resolve, reject) => {
Documents.findById(id, function (err, documents) {
if (err) reject(err);

console.log(DocumentsData);
for (let i in DocumentsData) {
documents[i] = DocumentsData[i];
}
documents.save(function (err, updatedDocuments) {
if (err) return reject(err);
resolve(updatedDocuments);
});
});
})
};
exports.removeById = (DocumentsId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: DocumentsId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
