/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  logout: function (req, res) {
    if (req.body.id) {
      User.update({
        id: req.body.id
      }, {
        online: false
      }, function (errUpdate, resUpdate) {
        if (errUpdate) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (!resUpdate) return res.ok({
          'success': false,
          'msg': 'You can not be not online now'
        });
        req.session.userId = '';
        req.session.loggedin = false;
        return res.ok({
          'success': true,
          'msg': 'Logout successfull'
        });
      });
    }
  },
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
          // if (ress.online)
          //   return res.ok({
          //     'success': false,
          //     'msg': 'You are already online in some browser'
          //   });
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
            req.session.userId = ress.id;
            req.session.loggedin = true;
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

    if (req.session.userId && req.session.loggedin) {
      UserService
        .checkLogin(req.session.userId)
        .exec(function (err, ress) {
          if (err) {
            ress.redirect('/');
          } else if (!ress) {
            ress.redirect('/');
          } else {
            res.view();
          }
        });
    } else {
      res.redirect('/');
    }
  },
  loginpage: function (req, res) {
    res.view();
  },
  register: function (req, res) {
    if (req.body.firstname && req.body.username && req.body.password) {
      User.create(req.body, function (err, createdUser) {
        if (err) {
          if (err.invalidAttributes && err.invalidAttributes.hasOwnProperty("username") || err === 'E_VALIDATION') {
            let errMsg = err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] ? err.invalidAttributes.username[0].message : 'User name already exist'
            return res.ok({
              'success': false,
              'msg': errMsg
            })
          }


          if (err === 'E_VALIDATION' && err.attributes[0] == 'username') {
            return res.ok({
              'success': false,
              'msg': 'User name already exist'
            })
          }
          return res.serverError({
            'success': false,
            'msg': 'Something went wrong!!! Try again later'
          });
        }
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
  online: function (req, res) {
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
  },
  getById: function (req, res) {
    if (req.session.userId && req.session.loggedin) {

    } else {
      res.redirect('/')
    }
  }
};
