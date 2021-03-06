const DocumentsModel = require('../models/documents.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
DocumentsModel.createDocuments(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 100;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
DocumentsModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
DocumentsModel.findById(req.params.documentsId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
DocumentsModel.patchDocuments(req.params.documentsId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
DocumentsModel.removeById(req.params.documentsId)
.then((result)=>{
res.status(204).send({});
});
};
