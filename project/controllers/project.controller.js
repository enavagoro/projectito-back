const ProjectModel = require('../models/project.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
ProjectModel.createProject(req.body)
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
ProjectModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
ProjectModel.findById(req.params.projectId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
ProjectModel.patchProject(req.params.projectId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
ProjectModel.removeById(req.params.projectId)
.then((result)=>{
res.status(204).send({});
});
};
