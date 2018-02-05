/**
 * FileuploadController
 *
 * @description :: Server-side logic for managing fileuploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var multer = require('multer');
var express = require('express');
var app = express();

// app.use(express.static('public')); // for serving the HTML file

var upload = multer({ dest: __dirname + '../../assets/files' });
var type = upload.single('upl');



module.exports = {
  fileuploadpage: function (req, res) {
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
  upload: function (req, res) {
    if (req.method === 'GET')
      return res.json({
        'status': 'GET not allowed'
      });
    if (req.session.userId && req.session.loggedin) {
      var uploadFile = req.file('uploadFile');
      if (uploadFile) {
        uploadFile
          .upload({
              dirname: '../../assets/files'
            },
            function onUploadComplete(err, files) {
              console.log('files',files)
              if (err) return res.serverError({
                "success": false,
                "msg": err
              });
              if (!files) return res.ok({
                "success": false,
                "msg": "Server is busy"
              });
              if (files.length > 0) {
                var data = {
                  name: files[0].filename,
                  type: files[0].type,
                  path: sails.getBaseUrl() + '/' + files[0].fd.slice(files[0].fd.lastIndexOf('files')),
                  userid: req.session.userId
                }
                Fileupload
                  .create(data)
                  .exec(function (err2, uploaded) {
                    if (err2) return res.serverError({
                      "success": false,
                      "msg": err2
                    });
                    if (!uploaded) return res.ok({
                      "success": false,
                      "msg": "Server is busy"
                    });
                    // return res.ok({
                    //     "success": true,
                    //     "msg": "Uploaded successfully"
                    // });
                    res.redirect('/fileupload');
                  });
              }
            });
      } else return res.ok({
        "success": false,
        "msg": "No file to insert"
      });
    } else {
      res.redirect('/');
    }
  },
  getFiles: function (req, res) {

    if (req.session.userId && req.session.loggedin) {
      Fileupload
        .find({
          userid: req.session.userId
        })
        .populate("userid")
        .exec(function (err, files) {
          if (err) return res.serverError({
            "success": false,
            "msg": err
          });
          if (files.length == 0) return res.ok({
            "success": false,
            "msg": "No files found"
          });
          for (var i = 0; i < files.length; i++) {
            files[i].uploadedby = files[i].userid.name
            delete files[i]['userid']
          }
          return res.ok({
            "success": true,
            "msg": "Files found",
            "data": files
          })
        })
    } else {
      res.redirect('/');
    }
  },
  uploadvideo: function(req, res){
    var uploadFile = req.file('upl');
    if (uploadFile) {
      uploadFile
        .upload({
          dirname: '../../assets/files'
        },
        function onUploadComplete(err, files) {
          if (err) return res.serverError({
            "success": false,
            "msg": err
          });
          if (!files) return res.ok({
            "success": false,
            "msg": "Server is busy"
          });
          if (files.length > 0) {
            var data = {
              name: files[0].filename,
              type: files[0].type,
              path: sails.getBaseUrl() + '/' + files[0].fd.slice(files[0].fd.lastIndexOf('files')),
              userid: req.session.userId
            }
            Videoupload
              .create(data)
              .exec(function (err2, uploaded) {
                if (err2) return res.serverError({
                  "success": false,
                  "msg": err2
                });
                if (!uploaded) return res.ok({
                  "success": false,
                  "msg": "Server is busy"
                });
                // return res.ok({
                //     "success": true,
                //     "msg": "Uploaded successfully"
                // });
                res.redirect('/fileupload');
              });
          }
        });
    } else return res.ok({
      "success": false,
      "msg": "No file to insert"
    });
  }
};
