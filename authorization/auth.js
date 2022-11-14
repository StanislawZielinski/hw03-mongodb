const passport = require('passport');

const auth = (req, res, next) => {
  console.log(req.rawHeaders);
    passport.authenticate('jwt', { session: false }, (err, user) => {
      // console.log(err);
      if (!user || err) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Unauthorized',
          data: 'Unauthorized',
        })
      }
      req.user = user
      next()
    })(req, res, next)
  }

  module.exports = {
    auth,
  }