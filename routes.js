const routes = require('next-routes');

module.exports = routes()
  .add('user', '/@:username')
  .add('pkg', '/pkg/:pkg')
  .add('org', '/org/:organization')
  .add('compare', '/compare/:packages')
  .add('index', '/');
