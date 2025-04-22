const mysql = require("mysql2"); // Importa a biblioteca mysql2
// Cria a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
 host: "localhost", // Endereço do servidor MySQL (ou IP)
 user: "root", // Nome de usuário do MySQL
 password: "", // Senha do usuário
 database: "testeHj", // Nome do banco de dados
});
// Conecta ao banco de dados
connection.connect((err) => {
 if (err) {
 console.error("Erro ao conectar ao banco de dados:", err);
 return;
 }
 console.log("Conectado ao banco de dados MySQL com sucesso!");
 // Fecha a conexão após o teste
 connection.end((endErr) => {
 if (endErr) {
 console.error("Erro ao encerrar a conexão:", endErr);
 } else {
 console.log("Conexão encerrada com sucesso.");
 }
 });
});


const express = require("express");
const app = express();
const usuariosRoutes = require("./routes/usuarios");
const PORT = 3000;

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());
// Configura as rotas para usuários
app.use("/usuarios", usuariosRoutes);
// Inicia o servidor
app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
});
