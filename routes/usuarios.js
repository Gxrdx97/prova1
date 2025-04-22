const express = require("express");
const router = express.Router();
const connection = require("../config/db");




// Rota para listar todos os usuários (READ)
router.get("/usuarios", (req, res) => {
    connection.query("SELECT * FROM jogadores", (err, results) => {
        if (err) {
            res.status(500).send("Erro ao buscar usuários");
            console.error("Erro:", err);
            return;
        }
        res.json(results);
    });
});





// Rota para adicionar um novo usuário (CREATE)
router.post("/usuarios", (req, res) => {
    const { nome, nickname } = req.body;
    const sql = "INSERT INTO jogadores (nome, nickname) VALUES (?, ?)";
    connection.query(sql, [nome, nickname], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao inserir usuário");
            console.error("Erro:", err);
            return;
        }
        res.status(201).send("Usuário inserido com sucesso");
    });
});
// Rota para atualizar um usuário (UPDATE)
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome, nickname } = req.body;
    const sql = "UPDATE jogadores SET nome = ?, nickname = ? WHERE id = ?";
    connection.query(sql, [nome, nickname, id], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao atualizar usuário");
            console.error("Erro:", err);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("Usuário não encontrado");
        } else {
            res.send("Usuário atualizado com sucesso");
        }
    });
});
// Rota para deletar um usuário (DELETE)
router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM jogadores WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send("Erro ao deletar usuário");
            console.error("Erro:", err);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("Usuário não encontrado");
        } else {
            res.send("Usuário deletado com sucesso");
        }
    });
});
module.exports = router;
