const npmUser = require('@pkgstats/npm-user');

export default async (req, res) => {
  const user = await npmUser(req.params.username);

  res.json(user);
}
