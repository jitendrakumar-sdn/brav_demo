/**
 * MsgController
 *
 * @description :: Server-side logic for managing msgs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  seen: function (req, res) {
    if (req.body.id) {
      Msg
        .update({
          to: req.body.id
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
          if (seen.length == 0) {
            return res.ok({
              "success": false,
              "msg": "Message could seen at the moment"
            });
          }
          return res.ok({
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
    if (req.body.msgid) {
      Msg
        .update({
          msgid: req.body.msgid
        }, {
          seen: true,
          read: true
        })
        .exec(function (err, read) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          if (read.length == 0) {
            return res.ok({
              "success": false,
              "msg": "Message could read at the moment"
            });
          }
          return res.ok({
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
  new: function (req, res) {
    if (req.body.msg && req.body.to && req.body.from && req.body.msgid) {
      Msg
        .create(req.body)
        .exec(function (err, sent) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          if (!sent) {
            return res.ok({
              "success": false,
              "msg": "Message could not sent at the moment"
            });
          }
          return res.ok({
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
  },
  unseen: function (req, res) {
    if (req.query.id) {
      Msg
        .find({ to: req.query.id, seen: false }, { select: ['createdAt', 'id', 'msg', 'msgid', 'from', 'to'] })
        .populate('from')
        .exec(function (err, unseen) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          if (unseen.length == 0) {
            return res.ok({
              "success": false,
              "msg": "No unseen message found"
            });
          }
          for (var i = 0; i < unseen.length; i++) {
            unseen[i].from = { id: unseen[i].from.id, name: unseen[i].from.name, timezone: ((unseen[i].from.timezone).split(" ")[1]).split(',')[0] };
          }
          return res.ok({
            "success": true,
            "msg": "Unseen Message found",
            "data": unseen
          });
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Invalid msg id"
      })
    }
  },
  getAllMsgs: function (req, res) {
    if (req.session.userId && req.session.loggedin && req.query.to && req.query.from) {

      Msg
        .find({
          or: [
            {
              to: req.query.to,
              from: req.query.from
            }, {
              to: req.query.from,
              from: req.query.to
            }
          ]
        }, { select: ['createdAt', 'msg', 'from', 'to'] })
        .limit(20)
        .skip(req.query.skip || 0)
        .exec(function (err, msgs) {
          if (err) {
            return res.serverError({
              "success": false,
              "msg": err
            });
          }
          if (msgs.length == 0) {
            return res.ok({
              "success": false,
              "msg": "No message found"
            });
          }
          return res.ok({
            "success": true,
            "msg": "Messages found",
            "data": msgs
          });
        })
    } else {
      return res.ok({
        "success": false,
        "msg": "Invalid client ID"
      })
    }
  }
};
