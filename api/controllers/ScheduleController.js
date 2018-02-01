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
          } else if (!ress) {
            res.redirect('/');
          } else {
            res.view();
          }
        });
    } else {
      res.redirect('/');
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
          } else if (!ress) {
            res.redirect('/');
          } else {
            res.view();
          }
        });
    } else {
      res.redirect('/');
    }
  },
  newschedule: function (req, res, ok) {
    if (req.body.title && req.body.start && req.body.end && req.body.time && req.body.availabilty && req.body.description) {
      req.body.userid = req.session.userId;
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
          return res.ok({
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
  },
  getNotification: function (req, res) {
    if (req.query.start && req.query.time) {
      Schedule
        .find({
          or: [{
            start: req.query.start
          }, {
            end: req.query.start
          }],
          time: req.query.time
        })
        .exec(function (err, ress) {
          if (err) return res.serverError({
            'success': false,
            'msg': 'Something went wrong!!! Try again later'
          });
          if (ress.length == 0) return res.ok({
            'success': false,
            'msg': 'Notification not found'
          });
          return res.ok({
            'success': true,
            'msg': 'Notification Found',
            'data': ress
          });
        });
    } else {
      return res.ok({
        'success': false,
        'msg': 'Provide start date and time'
      });
    }
  },
  seenNotification: function (req, res) {
    if (req.query.userid) {
      Schedule
        .update({
          userid: req.query.userid
        }, {
          seen: true
        })
        .exec(function (err, updated) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            })
          }
          console.log(updated)
          if (!updated) {
            return res.ok({
              "success": false,
              "msg": "Notification seen can not be updated"
            })
          }
          return res.ok({
            "success": true,
            "msg": "Notification seen updated successfull"
          })
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Please provide user ID"
      })
    }
  },
  readNotification: function (req, res) {
    if (req.query.id) {
      Schedule
        .update({
          id: req.query.id
        }, {
          read: true
        })
        .exec(function (err, updated) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            })
          }
          console.log(updated)
          if (!updated) {
            return res.ok({
              "success": false,
              "msg": "Notification read can not be updated"
            })
          }
          return res.ok({
            "success": true,
            "msg": "Notification read updated successfull"
          })
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Please provide notification ID"
      })
    }
  }
};
