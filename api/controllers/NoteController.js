/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  notepage: function (req, res) {
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
      // return res.ok({
      // 	'success': false,
      // 	'expiry': true,
      // 	'msg': 'Your Session has been expired'
      // });
    }
  },
  createnew: function (req, res) {
    if (req.session.userId && req.session.loggedin) {
      Note.create(req.body, function (err, createdNote) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });

        if (!createdNote) {
          return res.ok({
            'success': false,
            'msg': 'Enter all flieds'
          });
        } else {
          return res.ok({
            'success': true,
            'msg': 'Note created'
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
  },
  notes: function (req, res) {
    if (req.session.userId && req.session.loggedin) {
      var query = {
        deleted: false
      };
      if (req.query.userid)
        query.userid = req.query.userid;
      Note.find(query).exec(function (err, resNote) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (resNote.length == 0) {
          return res.ok({
            'success': false,
            'msg': 'No Records found'
          });
        } else {
          return res.ok({
            'success': true,
            'msg': 'Note Found',
            'data': resNote
          });
        }
      })
    } else {
      res.redirect('/');
      // return res.ok({
      // 	'success': false,
      // 	'expiry': true,
      // 	'msg': 'Your Session has been expired'
      // });
    }
  },
  viewnote: function (req, res) {
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
      // return res.ok({
      // 	'success': false,
      // 	'expiry': true,
      // 	'msg': 'Your Session has been expired'
      // });
    }
  },
  deleteNote: function (req, res) {
    if (req.session.userId && req.session.loggedin) {
      if (req.body.noteid) {
        Note
          .update({
            id: req.body.noteid
          }, {
            deleted: true
          }).exec(function (err, updatedNote) {
            if (err) return res.serverError({
              'success': false,
              'msg': 'Something went wrong!!! Try again later'
            });
            if (!updatedNote) {
              return res.ok({
                'success': false,
                'msg': 'Server is busy!!! Try again later'
              });
            } else {
              return res.ok({
                'success': true,
                'msg': 'Note upated successfully',
                'data': updatedNote
              });
            }
          });
      } else {
        return res.ok({
          'success': false,
          'msg': 'Invalid note',
          'data': updatedNote
        });
      }
    } else {
      res.redirect('/');
    }
  }
};
