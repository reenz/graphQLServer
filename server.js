const express = require("express");
const express_graphql = require("express-graphql");
const {buildSchema} = require("graphql");

const app = express();
const port = 4000;
const host = "0.0.0.0";

//graphql schema
const schema = buildSchema(`
type Query{
  course(title: String): Course
},
type Course {
  id: Int
  title: String
}
`);

const courseData = [
  {
    id: 1,
    title: "GraphQL"
  }
]

const getCourse = function(args){
  const title = args.title
  return courseData.filter(course => {
    return course.title == title;
  })[0];
}

//root resolver
const root = {
  course: getCourse
};

//express server and graphql endpoint
app.use("/graphql", express_graphql({
  schema: schema, 
  rootValue: root,
  graphiql: true
  }));

app.listen(port, () => console.log(`Express GraphQL server running on ${host} ${port}`));
