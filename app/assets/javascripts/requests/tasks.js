$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
  var indexTasks = function (successCB, errorCB) {
    var request = {
      type: 'GET',
      url: 'api/tasks?api_key=1',
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  };

  var postTask = function (content, successCB, errorCB) {
    var request = {
      type: 'POST',
      url: 'api/tasks?api_key=1',
      data: {
        task: {
          content: content
        }
      },
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  };

  var deleteSingleTask = function(id, successCB, errorCB) {
    var request = {
      type: 'DELETE',
      url: 'api/tasks/' + id + '?api_key=1',
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
  };

  var markTaskComplete = function (id) {
    var request = {
      type: 'PUT',
      url: 'api/tasks/' + id + '/mark_complete?api_key=1',
      // success: successCB,
      // error: errorCB
    }
    $.ajax(request);
  };

  var markTaskActive = function (id) {
    var request = {
      type: 'PUT',
      url: 'api/tasks/' + id + '/mark_active?api_key=1',
      // success: successCB,
      // error: errorCB
    }
    $.ajax(request);
  };