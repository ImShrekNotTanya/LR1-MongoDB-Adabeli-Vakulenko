# Импортируем необходимые модули из Flask и pymongo
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

# Создаем экземпляр приложения Flask
app = Flask(__name__)

# Указываем URI для подключения к MongoDB
MONGO_URI = 'mongodb://localhost:27017/'
# Имя базы данных
DB_NAME = 'WorkParsing'
# Имя коллекции в базе данных
COLLECTION_NAME = 'AB'

# Функция для получения подключения к базе данных
def get_db():
    client = MongoClient(MONGO_URI)  # Создаем клиента MongoDB
    return client[DB_NAME]  # Возвращаем базу данных

# Определяем маршрут для главной страницы
@app.route('/')
def index():
    db = get_db()  # Получаем подключение к базе данных
    items = list(db[COLLECTION_NAME].find())  # Извлекаем все элементы из коллекции
    return render_template('index.html', items=items)  # Рендерим шаблон с переданными элементами

# Определяем маршрут для добавления нового элемента
@app.route('/add', methods=['POST'])
def add_item():
    db = get_db()  # Получаем подключение к базе данных
    new_item = request.form.to_dict()  # Получаем данные из формы и преобразуем их в словарь
    db[COLLECTION_NAME].insert_one(new_item)  # Вставляем новый элемент в коллекцию
    return redirect(url_for('index'))  # Перенаправляем пользователя на главную страницу

# Определяем маршрут для обновления существующего элемента
@app.route('/update/<item_id>', methods=['POST'])
def update_item(item_id):
    db = get_db()  # Получаем подключение к базе данных
    updated_item = request.form.to_dict()  # Получаем обновленные данные из формы
    # Обновляем элемент в коллекции по его идентификатору
    db[COLLECTION_NAME].update_one({'_id': ObjectId(item_id)}, {'$set': updated_item})
    return redirect(url_for('index'))  # Перенаправляем пользователя на главную страницу

# Определяем маршрут для удаления элемента
@app.route('/delete/<item_id>')
def delete_item(item_id):
    db = get_db()  # Получаем подключение к базе данных
    # Удаляем элемент из коллекции по его идентификатору
    db[COLLECTION_NAME].delete_one({'_id': ObjectId(item_id)})
    return redirect(url_for('index'))  # Перенаправляем пользователя на главную страницу


if __name__ == '__main__':
    from bson.objectid import ObjectId  # Импортируем ObjectId для работы с идентификаторами MongoDB
    app.run(debug=True)  # Запускаем приложение в режиме отладки
