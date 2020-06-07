const express = require("express");
const { celebrate, Segments, Joi} = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const connection = require("./database/connection");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);

//A validação vem antes do objeto que será criado, se passar pela validação ai o objeto é montado.
routes.post("/ongs", celebrate({
    //Sempre que a chave do objeto(no caso 'Segments.Body') for uma variavel do javaScript, temos de colocar ele entre colchetes.
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),//o nome tem de ser letra e é obrigatorio
        email: Joi.string().required().email(),//o e-mail tem de ser letra e é obrigatorio, e se é do tipo e-mail
        whatsapp: Joi.string().min(11).required(),//o wpp tem de ser número e é obrigatorio, com minimo de 11 números e max 12
        city: Joi.string().required(),//a cidade tem de ser letra e é obrigatorio
        uf: Joi.string().required().length(2)//o nome tem de ser letra e é obrigatorio e tem tamanho de 2 caracter
    })
}), OngController.create);

//Validar a rota do profile, colocar para ser obrigatorio o id da ong, pois ele recebe o authorization(id) como parametro para funcionar.
routes.get("/profile", celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), ProfileController.index);

routes.get("/incidents", IncidentController.index);
//Realizando validaão no header e no body na mesma rota
routes.post("/incidents", celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.BODY] : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().max(1000),
        value: Joi.number().required()
        })

}), IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes ;

