const documentsController = require('./controllers/documents.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/documents', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
documentsController.insert
]);
app.get('/documents', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
documentsController.list
]);
app.get('/documents/:documentsId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
documentsController.getById
]);
app.patch('/documents/:documentsId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
documentsController.patchById
]);
app.delete('/documents/:documentsId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

documentsController.removeById
]);
};
