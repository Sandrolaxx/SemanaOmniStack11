//Primeiro testando as funcionalidades da ONG--Poderiamos colocar a Criação/Listagem/Delete, tudo no mesmo arquivo, pois se trata do mesmo elemento
const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe("ONG", () => {
    beforeEach(async () => {
        await connection.migrate.rollback();//interessante fazer isso para desfazer o que fizemos no ultimo teste, para o banco não ficar gigante.
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });
    //Teste para validar se o ong retorna uma ong e se o id é igual a 8
    it("verificar se ela pode criar uma nova ONG", async () => {
        const response = await request(app)
        .post('/ongs')
        //.set("Authorization", "asd")Para fazer teste em rotas que pucham o heade
        .send({
            name: "APAD2",
            email: "Sandrolax@hotmail.com",
            whatsapp: "45991039812",
            city: "Rio do Sul",
            uf: "PR"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});