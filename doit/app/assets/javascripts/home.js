$(document).ready(function() {
  console.log("I'm here!!");
  $("#add_todo").submit(function() {
    appendTodo();
    saveTaskRemotely();
    return false;
  });
  bindTodos($('.todos input[type="checkbox"]'), false);
  bindTodos($('.completed_todos input[type="checkbox"]'), true);
});

function bindTodos(elements, completed) {
  console.log("bind todos = " + completed + " count = " + elements.length);
  elements.each(function() {
    $(this).click(function() {
      var input = $(this);
      var parent = input.parent().parent();
      parent.slideToggle("fast", function() {
        input.unbind();
        bindTodos(input, !completed);
        $(this).appendTo((completed? '.todos' : '.completed_todos')).slideToggle();
      });
    });
  });
}

function appendTodo() {
  var input = $('#todo');
  if (input.val()) {
    var div = $('<div/>', {class: 'todo_item'});
    var p = $('<p/>');
    var checkbox = $('<input/>', {
      type: 'checkbox'
    });
    var span = $('<span/>', {text: ' ' + input.val()});

    checkbox.appendTo(p);
    span.appendTo(p);
    p.appendTo(div);
    div.appendTo('.todos');

    // to bind the new element in the uncompleted todos
    bindTodos(checkbox, false);
  }
}

function saveTaskRemotely() {
  var todoInput = $('#todo');
  var value = todoInput.val();
  todoInput.val('');
  if (value) {
    $.ajax({
      url: '/tasks',
      type: 'post',
      data: 'task[title]=' + value,
      success: function() {
        console.log('success');
      },
      error: function() {
        console.log('error');
      }
    });
  }
}
