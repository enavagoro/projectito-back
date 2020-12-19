const userController = require('./controllers/user.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
app.post('/user', [
userController.insert
]);
app.get('/user', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
userController.list
]);
app.get('/user/:userId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
userController.getById
]);
app.patch('/user/:userId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
userController.patchById
]);
app.delete('/user/:userId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
userController.removeById
]);
app.post('/user/login',[
//	ValidationMiddleware.validJWTNeeded,
//        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
userController.getByEmail
])
};
