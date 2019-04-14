const routes = require('next-routes');

module.exports = routes()
  .add('/@:username', 'user')
  .add('/pkg\::pkg', 'pkg')
  .add('/org\::organization', 'org')
  .add('/compare/:packages', 'compare')
  .add('/', 'index');
