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
  newschedule: function(req, res){
    if (req.body.conflictname && req.body.month && req.body.date && req.body.year && req.body.hr && req.body.min && req.body.availabilty && req.body.description) {
      Schedule.create(req.body, function (err, createdSchedule) {
        if (err) return res.serverError({
          'success': false,
          'msg': 'Something went wrong!!! Try again later'
        });
        if (!createdSchedule) return res.ok({
          'success': false,
          'msg': 'Enter all flieds'
        });
        return res.ok({
          'success': true,
          'msg': 'Schedule inserted',
          data: createdSchedule
        });
      });
    } else {
      return res.ok({
        'success': false,
        'msg': 'Enter all manditory field'
      });
    }
  }
};

