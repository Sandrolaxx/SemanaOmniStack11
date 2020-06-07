//Na pasta unique fica os teste de pequenas funcionalidades
//Documentação do JEST https://jestjs.io/docs/en/api
const criaId = require('../../utils/criaId');

describe( 'Cria um ID unico', () => {
    it("ele deve gerar ID unico", () => {
        const id = criaId();

        expect(id).toHaveLength(8);//Ele espera que o ID tenha 8 caracteres
    });
});



//TESTE PARA SABER SE 2+2 É 5
// describe( 'Cria um ID unico', () => {
//     it("ele deve voltar o numero 4", () => {
//         expect(2 + 2).toBe(5);//Se colocar 4 o teste passa, deste modo que está ele reprova.
//     });
// });