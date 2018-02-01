angular
  .module('brav')
  .factory('notesService', notesService);

notesService.$inject = ['commonService', 'constants'];

function notesService(commonService, constants) {

  var NotesService = {
    createNote: createNote,
    getNotes: getNotes
  };

  return NotesService;

  function createNote(data) {
    console.log('asdasd', data)
    return commonService.addCall(constants.createNote, data);
  }

  function getNotes(id) {
    console.log('NSC.user', id)
    return commonService.getByIdCall(constants.getNotes, {
      userid: id
    });
  }

}
