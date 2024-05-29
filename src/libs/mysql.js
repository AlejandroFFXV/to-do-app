import mysql from "serverless-mysql";
// Como conectar una base de datos con NextJS en src creamos la carpeta libs y en dicha carpeta nuestro archivo
export const conn = mysql({
  config: {
    host: "localhost",
    user: "michosa",
    password: "nerobb",
    port: "3306",
    database: "todoapp",
  },
});
