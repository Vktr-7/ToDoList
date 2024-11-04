let input = document.querySelector('.entered-list'); 
let addBtn = document.querySelector('.add-list'); 
let tasks = document.querySelector('.tasks');

// Загрузка задач из LocalStorage
function loadTasks() {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksFromStorage.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Сохранение задач в LocalStorage
function saveTasks() {
    const tasksToSave = [];                                                                              
    document.querySelectorAll('.item').forEach(item => {
        tasksToSave.push({
            text: item.querySelector('p').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
}

// Функция для добавления задачи в DOM
function addTaskToDOM(taskText, isCompleted) {
    let newItem = document.createElement('div'); 
    newItem.classList.add('item');
    if (isCompleted) {
        newItem.classList.add('completed');
    }
    newItem.innerHTML = `
        <p>${taskText}</p>
        <div class="item-btn">
            <i class="fa-solid fa-pen-to-square"></i> 
            <i class="fa-solid fa-xmark"></i>
        </div>
    `;
    tasks.appendChild(newItem);
}

// Проверка состояния кнопки добавления
input.addEventListener('keyup', () => {
    if (input.value.trim() !== '') {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
});

// Добавление новой задачи
addBtn.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        addTaskToDOM(input.value.trim(), false);
        saveTasks();
        input.value = '';
    } else {
        alert('Пожалуйста, введите задачу');
    }
});

// Удаление задачи
tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-xmark')) {
        e.target.parentElement.parentElement.remove();
        saveTasks();
    }

    // Завершение задачи
    if (e.target.classList.contains('fa-pen-to-square')) {
        e.target.parentElement.parentElement.classList.toggle('completed');
        saveTasks();
    }
});

// Инициализация
loadTasks();
