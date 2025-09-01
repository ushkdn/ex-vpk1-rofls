FROM node:18

# Создаём рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Прописываем порт, который слушает приложение
EXPOSE 3000

# Команда запуска по умолчанию
CMD ["node", "app.js"]
