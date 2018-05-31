const express = require("express");
const express_graphql = require("express-graphql");
const {buildSchema} = require("graphql");

const app = express();
const port = 4000;
const host = "0.0.0.0";

//graphql schema
const schema = buildSchema(`
type Query{
  message: String
}
`);

//root resolver
const root = {
  message: () => 'Hello World!'
};

//express server and graphql endpoint
app.use("/graphql", express_graphql({
  schema: schema, 
  rootValue: root,
  graphiql: true
  }));

app.listen(port, () => console.log(`Express GraphQL server running on ${host} ${port}`));
