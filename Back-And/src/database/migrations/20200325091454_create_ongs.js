//Isso é o que ele ira fazer
exports.up = function(knex) {
  return knex.schema.createTable("ongs" , function(table){
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf",2).notNullable();
  });
};

//Isso é o que ele vai fazer causo o .up não funcione
exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};

//Para executar a criação da tabela usa-se o código: npx knex migrate:latest
