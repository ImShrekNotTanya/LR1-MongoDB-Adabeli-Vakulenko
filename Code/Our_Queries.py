import pymongo  # Импортируем библиотеку pymongo для работы с MongoDB

# Создаем клиент для подключения к MongoDB, указывая адрес и порт
client = pymongo.MongoClient("localhost", 27017)

# Получаем базу данных WorkParsing из клиента
db = client.WorkParsing

# Получаем коллекцию AB из базы данных
collection = db.AB

# Выводим список имен всех баз данных на сервере
print(client.list_database_names())

# Выводим список имен всех коллекций в базе данных WorkParsing
print(db.list_collection_names())

# Поиск всех документов в коллекции
# items = collection.find()  # Получаем все документы из коллекции
# for item in items:  # Перебираем каждый документ
#     print(item)  # Выводим документ на экран

# Сортировка документов по заголовкам
# documents = collection.find().sort("title")  # Получаем документы и сортируем их по полю "title"
# for x in documents:  # Перебираем отсортированные документы
#     print(x)  # Выводим документ на экран

# Подсчет количества записей в коллекции
collection = db.AB  # Переопределяем переменную collection для ясности (хотя она уже была определена)
count = collection.count_documents(filter={})  # Считаем количество документов в коллекции без фильтрации
print("Количество записей на данный момент:", count)  # Выводим количество записей на экран

# Обновление заголовка
# query = { "title": "Behind the Scenes: Bird in Nature" }  # Определяем запрос для поиска документа с указанным заголовком
# newvalue = { "$set": { "title": " Behind the Scenes (BTS)" } }  # Определяем новое значение для обновления заголовка
# collection.update_one(query, newvalue)  # Выполняем обновление одного документа, соответствующего запросу
# documents = collection.find()  # Получаем все документы из коллекции после обновления
# for x in documents:  # Перебираем все документы
#     print(x)  # Выводим документ на экран

# Удаление строки коллекции по заголовку
# query = { "title": "Behind the Scenes: Bird in Nature" }  # Определяем запрос для удаления документа с указанным заголовком
# collection.delete_one(query)  # Удаляем один документ, соответствующий запросу
# documents = collection.find()  # Получаем все документы из коллекции после удаления
# for x in documents:  # Перебираем все документы
#     print(x)  # Выводим документ на экран
