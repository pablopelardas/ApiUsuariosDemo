
# Fullstack Demo Usuarios

Este repositorio cuenta con dos proyectos adentro:
- Frontend
    - ABM de Usuarios
    - Vue con Pinia
- Backend
    - CRUD Usuarios
    - Express + Typescript + Prisma



## Variables de entorno Backend

Para correr este proyecto vas a necesitar tener un archivo .env con las siguientes variable de entorno

`DATABASE_URL` : Url de la base de datos MYSQL (si quisieras utilizar otra hay que modificar el archivo schema.prisma)

`CLIENT` : Url del frontend (PARA CORS)

`PORT` : Puerto que va a utilizar el backend, si no se provee usa 3001
## Variables de entorno Frontend

Para correr este proyecto vas a necesitar tener un archivo .env con la siguiente variable de entorno

`VITE_API_URL` : Url del backend


## Correr en local

Clonar el proyecto

```bash
  git clone https://github.com/pablopelardas/ApiUsuariosDemo
```

---

Abrir la carpeta del back

```bash
  cd back
```

Crear el .env con las variables de entorno del backend

Instalar dependencias

```bash
  npm install
```


Iniciar el servidor

```bash
  npm run dev
```

También podes hacer un `npm run build` y `npm start`

----

Abri la carpeta del frontend

```bash
  cd front
```

Crear el .env con las variables de entorno del frontend
Instalar dependencias

```bash
  npm install
```
Iniciar el servidor

```bash
  npm run dev
```
También podes hacer un `npm run build` y `npm run preview`

----

![image](https://github.com/pablopelardas/ApiUsuariosDemo/assets/31576799/91d7158b-018d-4d1a-ae08-55d72a287cc7)
![image](https://github.com/pablopelardas/ApiUsuariosDemo/assets/31576799/8412b055-872f-4f7f-8a7c-2a0d679db17d)
![image](https://github.com/pablopelardas/ApiUsuariosDemo/assets/31576799/6a028aee-defd-49b1-9dca-c028f5fd3864)


