const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');
const db = require('./database');

// Tipo de Personaje
const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    movie: { type: GraphQLString }
  }
});

// Query: Obtener personajes
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      resolve() {
        return new Promise((resolve, reject) => {
          db.all("SELECT * FROM characters", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
      }
    },
    character: {
      type: CharacterType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return new Promise((resolve, reject) => {
          db.get("SELECT * FROM characters WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
          });
        });
      }
    }
  }
});

// Mutaciones: CRUD
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCharacter: {
      type: CharacterType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movie: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_, { name, movie }) {
        return new Promise((resolve, reject) => {
          db.run("INSERT INTO characters (name, movie) VALUES (?, ?)", [name, movie], function (err) {
            if (err) reject(err);
            resolve({ id: this.lastID, name, movie });
          });
        });
      }
    },
    updateCharacter: {
      type: CharacterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        movie: { type: GraphQLString }
      },
      resolve(_, { id, name, movie }) {
        return new Promise((resolve, reject) => {
          db.run("UPDATE characters SET name = ?, movie = ? WHERE id = ?", [name, movie, id], function (err) {
            if (err) reject(err);
            resolve({ id, name, movie });
          });
        });
      }
    },
    deleteCharacter: {
      type: CharacterType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return new Promise((resolve, reject) => {
          db.run("DELETE FROM characters WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve({ id });
          });
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
