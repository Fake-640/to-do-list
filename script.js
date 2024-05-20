document.addEventListener('DOMContentLoaded', function () {
    const todoInputForm = document.getElementById('todo-input-form');
    const addTodoButton = document.getElementById('add-todo');
    const todoContainer = document.getElementById('todo-container');
    const alertMessage = document.getElementById('alert-message');
    const searchInputForm = document.getElementById('search-input-form');
  
    let todos = [
      { text: 'Learn Go', status: 'In Progress' },
      { text: 'Learn Mern', status: 'In Progress' },
    ];
  
    const renderTodos = (todoList) => {
      todoContainer.innerHTML = '';
      todoList.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className =
          'list-group-item d-flex justify-content-between align-items-center';
        todoItem.setAttribute('data-index', index);
  
        const statusBadge = document.createElement('span');
        statusBadge.className = 'badge bg-info me-auto ms-1';
        statusBadge.textContent = todo.status;
  
        const markCompletedButton = document.createElement('button');
        markCompletedButton.className = 'btn btn-primary me-1';
        markCompletedButton.textContent = 'Mark As Completed';
        markCompletedButton.addEventListener('click', () => markAsCompleted(index));
  
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-secondary me-1';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTodoItem(index));
  
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodoItem(index));
  
        todoItem.appendChild(document.createTextNode(todo.text));
        todoItem.appendChild(statusBadge);
        todoItem.appendChild(markCompletedButton);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);
  
        todoContainer.appendChild(todoItem);
      });
    };
  
    const addTodo = () => {
      const todoText = todoInputForm.value.trim();
      if (todoText === '') {
        alertMessage.style.display = 'block';
        setTimeout(() => {
          alertMessage.style.display = 'none';
        }, 2000);
        return;
      }
      todos.push({ text: todoText, status: 'In Progress' });
      renderTodos(todos);
      todoInputForm.value = '';
    };
  
    const markAsCompleted = (index) => {
      todos[index].status = 'Completed';
      renderTodos(todos);
    };
  
    const editTodoItem = (index) => {
      const newTodoText = prompt('Edit your todo:', todos[index].text);
      if (newTodoText !== null && newTodoText.trim() !== '') {
        todos[index].text = newTodoText.trim();
        renderTodos(todos);
      }
    };
  
    const deleteTodoItem = (index) => {
      todos.splice(index, 1);
      renderTodos(todos);
    };
  
    const searchTodo = () => {
      const searchText = searchInputForm.value.toLowerCase();
      const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchText)
      );
      renderTodos(filteredTodos);
    };
  
    addTodoButton.addEventListener('click', addTodo);
    searchInputForm.addEventListener('input', searchTodo);
  
    renderTodos(todos);
  });
  