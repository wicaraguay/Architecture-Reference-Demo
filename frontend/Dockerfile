# Etapa de construcción
FROM node:16-alpine as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Crear la build de producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos generados a NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para NGINX
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
