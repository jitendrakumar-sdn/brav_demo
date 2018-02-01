/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  taskpage: function (req, res) {
    if (req.session.userId && req.session.loggedin) {
      UserService
        .checkLogin(req.session.userId)
        .exec(function (err, ress) {
          if (err) {
            res.redirect('/');
		// return res.ok({
		// 	'success': false,
		// 	'expiry': true,
		// 	'msg': 'Your Session has been expired'
		// });
          }
          else if (!res) {
            res.redirect('/');
		// return res.ok({
		// 	'success': false,
		// 	'expiry': true,
		// 	'msg': 'Your Session has been expired'
		// });
          }
          else {
            res.view();
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
  },
};

