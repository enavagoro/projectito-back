const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Videochema = new Schema({
title : String,
description : String,
date : Date,
status : Boolean,
projectId : String,
enterpriseId : String,

}, { timestamps: true }
);
Videochema.virtual('id').get(function () {
return this._id.toHexString();
});
Videochema.set('toJSON', {
virtuals: true
});

Videochema.findById = function (cb) {
return this.model('Video').find({id: this.id}, cb);
};
const Video = mongoose.model('Video', Videochema);
exports.findById = (id) => {
return Video.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createVideo = (VideoData) => {
const video = new Video(VideoData);
return video.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Video.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, video) {
if (err) {
reject(err);
} else {
resolve(video);
}
})
});
};
exports.patchVideo = (id, VideoData) => {
return new Promise((resolve, reject) => {
Video.findById(id, function (err, video) {
if (err) reject(err);

console.log(VideoData);
for (let i in VideoData) {
video[i] = VideoData[i];
}
video.save(function (err, updatedVideo) {
if (err) return reject(err);
resolve(updatedVideo);
});
});
})
};
exports.removeById = (VideoId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: VideoId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};