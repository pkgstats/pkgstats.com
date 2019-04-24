module.exports = (req, res, next) => {
  const hosts = [
    'pkgstats.com',
  ];
  const proto = req.get('x-forwarded-proto')
    ? req.get('x-forwarded-proto')
    : req.protocol;
  const host = req.get('host');
  const redirect = proto !== 'https' || hosts.indexOf(host) > -1;
  const redirectTo = (hosts.indexOf(host) > -1)
    ? `https://www.${host}${req.path}`
    : `https://${host}${req.path}`;

  if (redirect) {
    res.redirect(301, `${redirectTo}${req.originalUrl}`);
  } else {
    next();
  }
};
