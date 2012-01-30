$(function() {
  $("#add_todo").submit(function() {
    appendTodo();
    addTaskRemotely();
    return false;
  });
  bindTodos($('.todos input[type="checkbox"]'), true);
  bindTodos($('.completed_todos input[type="checkbox"]'), false);
});

function bindTodos(elements, completed) {
  elements.each(function() {
    $(this).click(function() {
      var input = $(this);
      var parent = input.parent().parent();
      parent.slideToggle("fast", function() {
        input.unbind();
        bindTodos(input, !completed);
        parent.append(completed? '.completed_todos' : '.todos').slideToggle();
      });
    });
  });
}

function appendTodo() {
  var input = $('#todo);
  if (input.val()) {
    var div = $('<div/>', {class: 'todo_item'});
    var p = $('<p/>');
    var checkbox = $('<input/>', {
      type: 'checkbox'
    });
    var span = $('<span/>', {text: ' ' + input.val()});

    checkbox.append(p);
    span.append(p);
    p.append(div);
    div.append('.todos');

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
