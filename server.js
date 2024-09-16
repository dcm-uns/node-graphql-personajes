const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const app = express();

// Middleware para GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true // habilita la interfaz gráfica para pruebas
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
});

