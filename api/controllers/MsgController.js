/**
 * MsgController
 *
 * @description :: Server-side logic for managing msgs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  seen: function (req, res) {
    if (req.query.msgid) {
      Msg
        .update({
          msgid: req.query.msgid
        }, {
          seen: true
        })
        .exec(function (err, seen) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          console.log('msg seen', seen)
          if (!seen) {
            return res.serverError({
              "success": false,
              "msg": "Message could seen at the moment"
            });
          }
          return res.serverError({
            "success": true,
            "msg": "Message seen successfully"
          });
        });
    } else {
      return res.ok({
        "success": false,
        "msg": "Invalid msg id"
      })
    }
  },
  read: function (req, res) {
    if (req.query.msgid) {
      Msg
        .update({
          msgid: req.query.msgid
        }, {
          read: true
        })
        .exec(function (err, read) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          console.log('msg read', read)
          if (!read) {
            return res.serverError({
              "success": false,
              "msg": "Message could read at the moment"
            });
          }
          return res.serverError({
            "success": true,
            "msg": "Message read successfully"
          });
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Invalid msg id"
      })
    }
  },
  send: function (req, res) {
    if (req.body.msg && req.body.to && req.body.from) {
      Msg
        .create(req.body)
        .exec(function (err, sent) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          console.log('msg sent', sent)
          if (!sent) {
            return res.serverError({
              "success": false,
              "msg": "Message could not sent at the moment"
            });
          }
          return res.serverError({
            "success": true,
            "msg": "Message sent successfully"
          });
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Invalid msg id"
      })
    }
  }
};
