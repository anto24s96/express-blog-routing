//importazione moduli
const path = require("path");
const express = require("express");

//Creazione app Express
const app = express();
const port = 3000;

//Importazione router per le rotte dei post
const postsRouter = require("./routers/posts.js");

// Configuro middleware per servire file statici dalla cartella "public"
app.use(express.static("public"));
// Configuro middleware per analizzare il corpo delle richieste JSON
app.use(express.json());

//Definizione rotte
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "./index.html");
    res.sendFile(filePath);
});

app.use("/posts", postsRouter);

//Avvio server
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
