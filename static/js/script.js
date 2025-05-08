function toggleTable(button) {
    // Получаем элемент таблицы по его ID
    const table = document.getElementById('data-table');
    // Получаем все строки таблицы
    const rows = table.rows;

    // Проверяем, свернуты ли строки (если стиль display у третьей строки 'none')
    const isCollapsed = rows[2].style.display === 'none';

    // Перебираем все строки начиная с третьей
    for (let i = 2; i < rows.length; i++) {
        // Если строки свернуты, показываем их, иначе скрываем
        rows[i].style.display = isCollapsed ? '' : 'none';
    }

    // Меняем текст кнопки в зависимости от текущего состояния
    button.textContent = (button.textContent === 'Показать полностью') ? 'Свернуть' : 'Показать полностью';
}

function toggleForm() {
    // Получаем форму добавления элемента по ее ID
    var form = document.getElementById('add-item-form');
    // Получаем кнопку переключения формы по ее ID
    var button = document.getElementById('toggle-form-button');

    // Переключаем класс 'collapsed' у формы, что изменяет ее видимость
    form.classList.toggle('collapsed');

    // Меняем текст кнопки в зависимости от состояния формы
    button.textContent = (form.classList.contains('collapsed')) ? 'Добавить новый элемент' : 'Скрыть форму добавления';
}

// Функция, выполняемая при загрузке страницы
window.onload = function() {
    // Получаем таблицу по ее ID
    const table = document.getElementById('data-table');
    // Получаем все строки таблицы
    const rows = table.rows;

    // Скрываем все строки таблицы, начиная с третьей
    for (let i = 2; i < rows.length; i++) {
        rows[i].style.display = 'none';
    }

    // Получаем форму добавления элемента по ее ID и добавляем класс 'collapsed'
    var form = document.getElementById('add-item-form');
    form.classList.add('collapsed');

    // Получаем кнопку переключения формы и меняем ее текст
    var button = document.getElementById('toggle-form-button');
    button.textContent = 'Добавить новый элемент';
};

function toggleContent(button) {
    // Получаем внутренний контейнер контента, который нужно развернуть/свернуть
    const contentInner = button.parentNode.querySelector('.content-inner');

    // Переключаем класс 'expanded', чтобы показать или скрыть контент
    contentInner.classList.toggle('expanded');

    // Меняем текст кнопки в зависимости от состояния контента
    button.textContent = (button.textContent === 'Читать далее') ? 'Свернуть' : 'Читать далее';
}

function toggleEditForm(formId, row, button) {
    // Получаем таблицу по ее ID
    const table = document.getElementById('data-table');

    // Переключаем класс 'editing' у таблицы, чтобы изменить ее состояние редактирования
    table.classList.toggle('editing');

    // Получаем все ячейки текущей строки, исключая ячейку "Действия"
    const cells = row.querySelectorAll('td:not(.actions-cell)');

    // Переключаем класс 'collapsed' для каждой ячейки, чтобы скрыть или показать их
    cells.forEach(cell => {
        cell.classList.toggle('collapsed');
    });

    // Получаем форму редактирования по переданному ID
    const form = document.getElementById(formId);

    // Меняем стиль отображения формы на 'block' или 'none'
    form.style.display = (form.style.display === 'none' ? 'block' : 'none');

    // Меняем текст кнопки в зависимости от состояния формы редактирования
    button.textContent = (button.textContent === 'Редактировать') ? 'Вернуться' : 'Редактировать';

     // Получаем все заголовки таблицы, исключая заголовок "Действия"
    const headers = table.querySelectorAll('th:not(#actions-header)');

    // Переключаем класс 'collapsed' для каждого заголовка
    headers.forEach(header => {
        header.classList.toggle('collapsed');
    });

    // Находим кнопку "Читать далее" в текущей строке и скрываем ее при редактировании
    const readMoreButton = row.querySelector('.collapsible .content-wrapper button');

    if (readMoreButton) {
        readMoreButton.style.display = table.classList.contains('editing') ? 'none' : '';
    }
}

function confirmDelete(event, deleteUrl) {
    // Предотвращаем переход по ссылке при нажатии на кнопку удаления
    event.preventDefault();

    // Получаем модальное окно подтверждения удаления и наложение
    const modal = document.getElementById('deleteConfirmationModal');
    const overlay = document.getElementById('modalOverlay');

    // Получаем кнопки подтверждения и отмены удаления
    const confirmButton = document.getElementById('confirmDeleteButton');
    const cancelButton = document.getElementById('cancelDeleteButton');

    // Показываем модальное окно и наложение
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Обработчик клика для кнопки подтверждения удаления
    confirmButton.onclick = function() {
        window.location.href = deleteUrl; // Переходим по URL удаления
        modal.style.display = 'none'; // Скрываем модальное окно
        overlay.style.display = 'none'; // Скрываем наложение
    };

    // Обработчик клика для кнопки отмены удаления
    cancelButton.onclick = function() {
        modal.style.display = 'none'; // Скрываем модальное окно
        overlay.style.display = 'none'; // Скрываем наложение
    };
}
