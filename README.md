 ### Simple Servidor GraphQL implementado en Node, Express, Express-Graphql y SQLite.

Este servidor ofrece una API GraphQL de una simple base de datos conteniendo una sola tabla, de personajes y películas.

Para instalar
- npm install

Para ejecutar el servidor
- node server.js

Luego pueden acceder a [http://localhost:4000/graphql](http://localhost:4000/graphql)

Algunos ejemplos de consultas que se pueden hacer en la interfaz web:

Obtener todos los personajes:

    {
      characters {
        id
        name
        movie
      }
    }

  
Crear un nuevo personaje:

    mutation {
      addCharacter(name: "Luke Skywalker", movie: "Star Wars") {
        id
        name
        movie
      } 
    }
    
Actualizar un personaje:

    mutation {
      updateCharacter(id: 1, name: "Darth Vader", movie: "Star Wars") {
        id
        name
        movie
     } 
    }
    
Borrar un personaje:

    mutation {
      deleteCharacter(id: 1) {
        id
      }
    }

