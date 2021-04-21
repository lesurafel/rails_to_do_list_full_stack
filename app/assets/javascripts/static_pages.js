var viewTasks = "all";
var allCompletedTasks = [];
var cont = 0;
$(".static_pages.index").ready(function(){
  var getAndDisplayAllTasks = function () { 
    var activeTasks = 0;   
    indexTasks(function(response) {
      allCompletedTasks = [];
      $('#todo-list').children().remove();
      $('#menu').children().remove();
      response.tasks.forEach(function (task) {
        if (task.completed === true) {
          allCompletedTasks.push(task.id);
        }

        if (viewTasks === 'all') {
          $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
        } else if (viewTasks === 'complete') {
          if (task.completed === true) {
            $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
          }
        } else {
          if (task.completed === false) {
            $('#todo-list').append('<li data-id ="' + task.id + '" class ="' + (task.completed ? 'checked' : '') + '">' + task.content + '<span class="delete">\u00D7</span></li>');
          }
        }
    
      }) // End of response.tasks.forEach
      
      if (response.tasks.length>0) {
        $('#menu').append('<div class="bottomMenu"><span>' + (response.tasks.length - allCompletedTasks.length) + ' Item left</span><span class="all"><a>All</a></span>' +
        '<span class="active"><a>Active</a></span>' +
        '<span class="complete"><a>Complete</a></span>' +
        '<span class="clearCompleted"><a>Clear Completed Tasks</a></span></div>');
      }
    }, function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    })
  }

  // Post Tasks
  $('#task-input').keypress(function (e) {
    var key = e.which;
    if (key == 13) {
      postTask($("#task-input").val(), function(response) {
        $("#task-input").val('');
        getAndDisplayAllTasks();
      }, function(request, errorMsg) {
        console.error(errorMsg);
      });
    }
  });

  // Delete Single Tasks
  $(document).on('click', '.delete', function (event) {
    event.stopPropagation();
    var id = $(this).parent().data('id');
    deleteSingleTask(id, function(response) {
      getAndDisplayAllTasks();
    },function (request, textStatus, errorMessage) {
        console.log(errorMessage);
    })
  });

  // Mark Task Avctive or Complete 
  
  $(document).on('click', 'li', function (event) {
    event.stopPropagation();
    getAndDisplayAllTasks();
    if (this.className === 'checked') {
      markTaskActive($(this).data('id'));
        $(this).removeClass('checked');    
    } else {
      markTaskComplete($(this).data('id'));
      $(this).addClass('checked');          
    }
    getAndDisplayAllTasks();    
  });

  $(document).on('click', '.all', function (event) {
    event.stopPropagation();
    viewTasks = "all";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.active', function (event) {
    event.stopPropagation();
    viewTasks = "active";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.complete', function (event) {
    event.stopPropagation();
    viewTasks = "complete";
    getAndDisplayAllTasks();
  });

  $(document).on('click', '.clearCompleted', function (event) {
    getAndDisplayAllTasks();  
    $('.checked > .delete').click();
  });

  getAndDisplayAllTasks();
});