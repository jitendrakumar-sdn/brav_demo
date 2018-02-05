$(document).ready(function () {

  if (window.location.pathname !== '/' && window.location.pathname !== '/register') {

    getnotification();
    msgUnSeen();
    getUsers();
    getNotes();

    setInterval(function () {
      getnotification();
      msgUnSeen();
      getUsers();
    }, 60000);
  }
  if (window.location.pathname === '/fileupload') {
    getFiles();
  }

  $('#total-notifications').hide();
  $('#total-newmsg').hide();


  $("#chat").click(function () {
    $(".chat-panel").toggle();
    $(".notes-panel").hide();
    $(".alert-panel").hide();
    $(".user-panel").hide();
    msgSeen(); // call onl;y if chat panel is open
  });

  $("#online-users").click(function () {
    $(".chat-panel").hide();
    $(".notes-panel").hide();
    $(".alert-panel").hide();
    $(".user-panel").toggle();
    getUsers(); // call onl;y if user panel is open
  });


  $("#notes").click(function () {
    $(".notes-panel").animate({
      width: "toggle"
    });
    $(".user-panel").hide();
    $(".chat-panel").hide();
    $(".alert-panel").hide();
    getNotes();
  });

  $("#alert-msg").click(function () {
    $(".alert-panel").toggle();
    $(".notes-panel").hide();
    $(".chat-panel").hide();
    seenNotification(); // call only if alert panel is open
  });

  $('#display-notes').on('click', 'li > input[type="checkbox"]', function () {
    if ($(this).is(":checked")) {
      deleteNotes($(this).attr('data-id'));
    }
  })

  $("#notifications li").on('click', function () {
    var _id = $(this).attr('data-id');
    if (_id) {
      $.ajax({
        url: '/schedule/readNotification',
        method: 'PUT',
        data: {
          id: _id
        },
        success: function (res) {

        },
        error: function (err) {

        }
      });
    }
  });

  $(".user-img").click(function () {
    $(".profile-edit").toggle();
  });

  $('#logout').on('click', function () {
    if (sessionStorage.getItem('bravUser')) {
      var id = JSON.parse(sessionStorage.getItem('bravUser')).id;
      $.ajax({
        url: "/user/logout",
        method: "POST",
        data: {
          id: id
        },
        success: function (res) {
          if (res.success) {
            sessionStorage.removeItem('bravUser');
            window.location = '/';
          }
        },
        error: function (err) {

        },
        dataType: 'JSON'
      });
    } else {
      window.location = '/';
    }
  });

  $('#mediator').on('click', function () {
    if (sessionStorage.getItem('bravUser')) {
      window.location = '/mediator/' + JSON.parse(sessionStorage.getItem('bravUser'))['id'];
    } else {
      window.location = '/';
    }
  })

});

function getAllMsgs(toId, fromId) {
  if (toId && fromId) {
    $.ajax({
      url: '/msg/getAllMsgs',
      method: 'GET',
      data: {
        to: toId,
        from: fromId
      },
      success: function (res) {
        if (res.success) {
          for (var i = 0; i < res.data.length; i++) {
            var _msg;
            var date;
            if (moment(res.data[i].createdAt).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))
              date = moment(res.data[i].createdAt).format("h:mm A");
            else
              date = moment(res.data[i].createdAt).format("DD-MM-YYYY h:mm A");

            if (res.data[i].to == toId)
              _msg = $('<p class="chat-msg text-right">' + res.data[i].msg + '<span>' + date + '</span></p>');
            else
              _msg = $('<p class="chat-msg">' + res.data[i].msg + '<span>' + date + '</span></p>');
            $('#chat-text' + toId).append(_msg);
            $('#chat-text' + fromId).append(_msg);
          }
        }
      },
      error: function (err) {
        // console.log(err)
      }
    })
  }
}

function isValidEmail(email) {
  if (email && (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(email)) {
    return true;
  }
  return false;
}

function seenNotification() {
  $.ajax({
    url: '/schedule/seenNotification',
    method: 'PUT',
    data: {
      userid: JSON.parse(sessionStorage.getItem('bravUser')).id
    },
    success: function (res) {
      if (res.success)
        $('#total-notifications').toggle();
    },
    error: function (err) {

    }
  });
}


function getUsers() {
  $.ajax({
    url: '/user/getAll',
    method: 'GET',
    success: function (res) {
      if (res.success) {
        var _list = $('#users').html('');
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].id != JSON.parse(sessionStorage.getItem('bravUser'))['id']) {
            var _li = $('<li class="client" data-id="' + res.data[i].id + '" data-name="' + res.data[i].name + '">' + res.data[i].name + '</li>');
            var _online;
            if (res.data[i].online) _online = $('<span class="is-online"></span>');
            else _online = $('<span class="is-offline"></span>');
            $(_list).append($(_li).append(_online));
          }
        }
      } else { }
    },
    error: function (err) {
      $('#errMsg').text(err.msg);
    },
    dataType: 'JSON'
  });
}

function msgUnSeen() {
  $.ajax({
    url: '/msg/unseen',
    method: 'GET',
    data: {
      id: JSON.parse(sessionStorage.getItem('bravUser')).id
    },
    success: function (res) {
      if (res.success) {
        var _main = $('#new-chats');
        _main.html('');
        $('#total-newmsg').text(res.data.length);
        $('#total-newmsg').toggle();
        for (var i = 0; i < res.data.length; i++) {
          var _li = $('<li class="client" data-id="' + res.data[i].from.id + '" data-name="' + res.data[i].from.name + '">' + res.data[i].msg + '<br><span>' + res.data[i].from.name + '</span><span class="msg-time">' + moment(res.data[i].createdAt).format("h:mm A") + '</span></li>');
          $(_main).append($(_li));
        }
      }
    },
    error: function (err) {
      return false;
    }
  });
}

function msgSeen() {
  $.ajax({
    url: '/msg/seen',
    method: 'PUT',
    data: {
      id: JSON.parse(sessionStorage.getItem('bravUser')).id
    },
    success: function (res) {
      if (res.success)
        $('#total-newmsg').hide();
    },
    error: function (err) {

    }
  });
}

function getnotification() {
  var today = moment().format('YYYY-MM-DD');
  var time = moment().format('h:mm A');
  var data = {
    start: today,
    time: time
  }
  $.ajax({
    url: '/schedule/getNotification',
    method: 'GET',
    data: data,
    success: function (res) {
      if (res.success) {
        var _notification = $('#notifications');
        $('#total-notifications').text(res.data.length);
        $('#total-notifications').toggle();
        for (var i = 0; i < res.data.length; i++) {
          var _li = $('<li data-id="' + res.data[i].id + '">Your session for ' + res.data[i].title +
            ' has started with<br>' +
            JSON.parse(res.data[i].availabilty).join(',') +
            '<br><br><a href="#">Join the session</a></li>');
          $(_notification).append($(_li));
        }
      } else {
        // swal()
      }
    },
    error: function (err) { },
    dataType: 'JSON'
  });
}

function getFiles() {
  $.ajax({
    url: '/fileupload/getFiles',
    method: 'POST',
    success: function (res) {
      var _userfiles = $('#user-files');
      $(_userfiles).html('')
      var _li;
      if (res.success) {
        _userfiles.html('');
        for (var i = 0; i < res.data.length; i++) {
          _li = $('<li><i class="fa fa-file"></i><a href="' + res.data[i].path + '" download>' + res.data[i].name + '</a><br><span>Uploaded by ' + res.data[i].uploadedby + ' on ' +
            moment(res.data[i].createdAt).format("DD-MM-YYYY h:mm A") + '</span></li>');
          $(_userfiles).append($(_li))
        }
      } else {
        _li = $('<li class="text-center">You not uploaded any files yet</li>');
        $(_userfiles).append($(_li))
      }
    },
    error: function (err) {

    }
  })
}

function getNotes() {
  $.ajax({
    method: "GET",
    url: '/note/notes',
    success: function (res) {
      var _main = $('#display-notes');
      $(_main).html('');
      var _note;
      if (res.success && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          _note = $('<li></li>');
          $(_note).html('<input type="checkbox" data-id="' + res.data[i].id + '"/><div data-id="' + res.data[i].id + '">' + res.data[i].note + '</div>');
          $(_main).append($(_note));
        }
      } else {
        _note = $('<li class="text-center">You dont have notes for now.</li>');
        $(_main).append($(_note));
      }
    },
    error: function (err) {

    },
    dataType: 'JSON'
  });
}

function deleteNotes(id) {
  if (id) {
    $.ajax({
      url: '/note/deleteNote',
      method: 'DELETE',
      data: {
        noteid: id
      },
      success: function (res) {
        if (res.success) getNotes();
        else swal({
          title: res.msg,
          icon: 'error'
        })
      },
      error: function (err) {

      }
    })
  }
}

function storeVedioInDatabase(blob, userid, clientid) {
  if (blob && userid && clientid) {
    var fd = new FormData();
    fd.append('upl', blob, "vedio.webm");
    fetch('/fileupload/uploadvideo',
      {
        method: 'POST',
        body: fd,
        headers: new Headers({
          'userid': JSON.parse(sessionStorage.getItem('bravUser')).id,
          'clientid': clientid
        })
      });
  }
}