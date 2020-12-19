const VideoModel = require('../models/video.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
VideoModel.createVideo(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
VideoModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
VideoModel.findById(req.params.videoId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
VideoModel.patchVideo(req.params.videoId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
VideoModel.removeById(req.params.videoId)
.then((result)=>{
res.status(204).send({});
});
};