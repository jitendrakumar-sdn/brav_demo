/**
 * MediatorController
 *
 * @description :: Server-side logic for managing mediators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    if (req.session.userId && req.session.loggedin && req.param('id') && req.session.userId == req.param('id')) {
      UserService
        .checkLogin(req.session.userId)
        .exec(function (err, ress) {
          if (err) {
            res.redirect('/');
          } else if (!ress) {
            res.redirect('/');
          } else {
            res.render('pages/mediator', {
              _layoutFile: '../shared/mediator_layout.ejs',
              id: req.param('id')
            });
          }
        });
    } else {
      res.redirect('/');
      // return res.ok({
      // 	'success': false,
      // 	'expiry': true,
      // 	'msg': 'Your Session has been expired'
      // });		
    }
  }
};
