const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Comentario = require("./database/Comentario");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão ok!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    Comentario.findAll({
        raw: true,
        order: [
            ["id", "DESC"]
        ]
    }).then(comentarios => {
        res.render("index", {
            comentarios: comentarios
        });
    });
});

app.get("/dead", (req, res) => {
    res.render("dead");
});

app.get("/nando", (req, res) => {
    res.render("nando");
});

app.get("/soad", (req, res) => {
    res.render("soad");
});

app.get("/serj_tankian", (req, res) => {
    res.render("serj_tankian");
});

app.get("/nirvana-fita-azul", (req, res) => {
    res.render("nirvana-fita-azul");
});

app.get("/lola_palooza", (req, res) => {
    res.render("lola_palooza");
});

app.get("/pink_floyd", (req, res) => {
    res.render("pink_floyd");
});

app.get("/venda_vinil", (req, res) => {
    res.render("venda_vinil");
});

app.get("/ozzy_slash", (req, res) => {
    res.render("ozzy_slash");
});

app.get("/tony", (req, res) => {
    res.render("tony");
});

app.get("/tyler_zztop", (req, res) => {
    res.render("tyler_zztop");
});

app.get("/guns_strippers", (req, res) => {
    res.render("guns_strippers");
});

app.get("/rock_in_rio", (req, res) => {
    res.render("rock_in_rio");
});

app.get("/", (req, res) => {
    res.render("/");
});

app.post("/salvarcomentario", (req, res) => {

    var usuario = req.body.usuario;
    var descricao = req.body.descricao;

    Comentario.create({
        usuario: usuario,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});

app.get("/comentarios/:id", (req, res) => {
    var id = req.params.id;
    Comentario.findOne({
        where: { id: id }
    }).then(comentarios => {
        if (comentarios != undefined) {

            Resposta.findAll({
                where: { comentarioId: comentarios.id }
            }).then(comentarios => {
                res.render("comentarios", {
                    comentarios: comentarios,
                    comentarios: comentarios
                });
            });

        } else {
            res.redirect("/");
        }
    });
})




app.listen(8080, () => {
    console.log("App rodando");
});