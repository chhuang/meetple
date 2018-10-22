const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

routes.add('/', '/');

routes.add('boardgame/view', '/boardgame/:slug');
