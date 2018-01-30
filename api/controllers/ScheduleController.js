/**
 * ScheduleController
 *
 * @description :: Server-side logic for managing schedules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  schedulepage: function (req, res) {
    res.view();
  },
  thankpage: function (req, res) {
    res.view();
  },
  newschedule: function(req, res, ok){
    if (req.body.title && req.body.start && req.body.end && req.body.time  && req.body.availabilty && req.body.description) {
      Schedule.create(req.body, function (err, createdSchedule) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        
        if (!createdSchedule){
          return res.ok({
          'success': false,
          'msg': 'Enter all flieds'
        });
        }else{        
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
  getschedule: function(req, res){
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

      // var data = [];
      // for(var i = 0; i<ress.length; i++)
      //   data.push({id:ress[i].id,title:ress[i].title,start:new Date(ress[i].start)})
      // return res.ok(data);
    });
  }
};

