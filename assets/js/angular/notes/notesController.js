angular
  .module('brav')
  .controller('notesController', notesController);

notesController.$inject = ['$location', 'notificationService', 'notesService', 'commonService'];

function notesController($location, notificationService, notesService, commonService) {
  var NSC = this;

  NSC.user = commonService.getSessionData();
  NSC.note;

  NSC.createNoteFn = createNoteFn;
  NSC.getNoteFn = getNoteFn;
  NSC.inputOptions = {
    angularIgnoreAttrs: ['class', 'ng-model', 'id', 'froala']
  }



  console.log($location.path())
  if ($location.path() === '/note')
    getNoteFn()

  function createNoteFn() {
    if (NSC.note && NSC.user) {
      var newNote = {
        note: NSC.note,
        userid: NSC.user.id
      }

      notesService
        .createNote(newNote)
        .then(function (res) {
            if (res.success) {
              notificationService.success(res.msg);
              NSC.note = "";
            } else {
              notificationService.info(res.msg);
            }
          },
          function (err) {
            // notificationService.error(err);
          });

    } else {
      if (!NSC.note) notificationService.error('Please enter note')
      else {
        notificationService.info('Your session is expired please login')
        $location.path('/');
      }
    }
  }

  function getNoteFn() {
    if (NSC.user) {
      notesService
        .getNotes(NSC.user.id)
        .then(function (res) {
          console.log('get note', res)
          if (res.success) {
            NSC.notes = res.data;
          } else {
            notificationService.info(res.msg);
          }
        }, function (err) {

        })
    }
  }
}
