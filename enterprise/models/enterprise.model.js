const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Enterprisechema = new Schema({
name : String,
address : String,
status : Boolean,
}, { timestamps: true }
);
Enterprisechema.virtual('id').get(function () {
return this._id.toHexString();
});
Enterprisechema.set('toJSON', {
virtuals: true
});

Enterprisechema.findById = function (cb) {
return this.model('Enterprise').find({id: this.id}, cb);
};
const Enterprise = mongoose.model('Enterprise', Enterprisechema);
exports.findById = (id) => {
return Enterprise.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createEnterprise = (EnterpriseData) => {
const enterprise = new Enterprise(EnterpriseData);
return enterprise.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Enterprise.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, enterprise) {
if (err) {
reject(err);
} else {
resolve(enterprise);
}
})
});
};
exports.patchEnterprise = (id, EnterpriseData) => {
return new Promise((resolve, reject) => {
Enterprise.findById(id, function (err, enterprise) {
if (err) reject(err);

console.log(EnterpriseData);
for (let i in EnterpriseData) {
enterprise[i] = EnterpriseData[i];
}
enterprise.save(function (err, updatedEnterprise) {
if (err) return reject(err);
resolve(updatedEnterprise);
});
});
})
};
exports.removeById = (EnterpriseId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: EnterpriseId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
