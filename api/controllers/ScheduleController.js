/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing schedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  schedulepage: function (req, res) {
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
          else if (!ress) {
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
  thankpage: function (req, res) {
    if (req.session.userId && req.session.loggedin) {
      UserService
        .checkLogin(req.session.userId)
        .exec(function (err, ress) {
          if (err) {
            // res.redirect('/');
            return res.ok({
              'success': false,
              'expiry': true,
              'msg': 'Your Session has been expired'
            });
          }
          else if (!ress) {
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
  newschedule: function (req, res, ok) {
    if (req.body.title && req.body.start && req.body.end && req.body.time && req.body.availabilty && req.body.description) {
      Schedule.create(req.body, function (err, createdSchedule) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });

        if (!createdSchedule) {
          return res.ok({
            'success': false,
            'msg': 'Enter all flieds'
          });
        } else {
          return res.jsonp({
            'success': true,
            'msg': 'Schedule inserted'
          });
        }

      });
    } else {
      return res.ok({
        'success': false,
        'msg': 'Enter all manditory field'
      });
    }
  },
  getschedule: function (req, res) {
    ScheduleService
      .getschedule()
      .exec(function (err, ress) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (!ress) return res.ok({
          'success': false,
          'msg': 'Invalid username or password'
        });
        return res.ok(ress);
      });
  }
};

