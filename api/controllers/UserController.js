/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function (req, res) {
    if (req.body.username && req.body.password) {
      UserService
        .getUser(req.body)
        .exec(function (err, ress) {
          if (err) return res.serverError({
            'success': false,
            'msg': 'Something went wrong!!! Try again later'
          });
          if (!ress) return res.ok({
            'success': false,
            'msg': 'Invalid username or password'
          });
          if (ress.online)
            return res.ok({
              'success': false,
              'msg': 'You are already online in some browser'
            });
          //   res.render('pages/mediator', {_layoutFile: '../shared/mediator_layout.ejs', id: ress.id, data: ress});
          User.update(ress, {
            online: true
          }, function (errUpdate, resUpdate) {
            if (errUpdate) return res.serverError({
              'success': false,
              'msg': 'Something went wrong!!! Try again later'
            });
            if (!resUpdate) return res.ok({
              'success': false,
              'msg': 'You can not be not online now'
            });
            return res.ok({
              'success': true,
              'msg': 'Login successfull',
              data: ress
            });
          });
        });
    } else {
      return res.ok({
        "success": false,
        "msg": "Please provide valid password and user name"
      });
    }

  },
  registerpage: function (req, res) {
    res.view();
  },
  profilepage: function (req, res) {
    res.view();
  },
  loginpage: function (req, res) {
    res.view();
  },
  register: function (req, res) {
    if (req.body.firstname && req.body.username && req.body.password) {
      User.create(req.body, function (err, createdUser) {

        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (!createdUser) return res.ok({
          'success': false,
          'msg': 'Invalid username or password'
        });
        return res.ok({
          'success': true,
          'msg': 'Register successfull',
          data: createdUser
        });
      });
    } else {
      return res.ok({
        'success': false,
        'msg': 'Enter all manditory field'
      });
    }
  },
  online: function (res, res) {
    UserService
      .getOnlineUser()
      .exec(function (err, onlineUser) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (onlineUser.length == 0) return res.ok({
          'success': false,
          'msg': 'No online users found'
        });
        return res.ok({
          'success': true,
          'msg': 'Found online user',
          data: onlineUser
        });
      })
  }
};
