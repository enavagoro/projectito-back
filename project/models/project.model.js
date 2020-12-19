const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Projectchema = new Schema({
name : String,
description : String,
status : Boolean,
enterpriseId : String,
}, { timestamps: true }
);
Projectchema.virtual('id').get(function () {
return this._id.toHexString();
});
Projectchema.set('toJSON', {
virtuals: true
});

Projectchema.findById = function (cb) {
return this.model('Project').find({id: this.id}, cb);
};
const Project = mongoose.model('Project', Projectchema);
exports.findById = (id) => {
return Project.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createProject = (ProjectData) => {
const project = new Project(ProjectData);
return project.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Project.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, project) {
if (err) {
reject(err);
} else {
resolve(project);
}
})
});
};
exports.patchProject = (id, ProjectData) => {
return new Promise((resolve, reject) => {
Project.findById(id, function (err, project) {
if (err) reject(err);

console.log(ProjectData);
for (let i in ProjectData) {
project[i] = ProjectData[i];
}
project.save(function (err, updatedProject) {
if (err) return reject(err);
resolve(updatedProject);
});
});
})
};
exports.removeById = (ProjectId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: ProjectId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
