const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos
const db = new sqlite3.Database('./characters.db');

// Datos de personajes a insertar
const characters = [
  { name: 'Luke Skywalker', movie: 'Star Wars' },
  { name: 'Darth Vader', movie: 'Star Wars' },
  { name: 'Frodo Baggins', movie: 'The Lord of the Rings' },
  { name: 'Gandalf', movie: 'The Lord of the Rings' },
  { name: 'Harry Potter', movie: 'Harry Potter' },
  { name: 'Hermione Granger', movie: 'Harry Potter' },
  { name: 'Indiana Jones', movie: 'Indiana Jones' },
  { name: 'Neo', movie: 'The Matrix' },
  { name: 'Marty McFly', movie: 'Back to the Future' },
  { name: 'Elsa', movie: 'Frozen' }
];

// Insertar personajes en la base de datos
db.serialize(() => {
  const stmt = db.prepare("INSERT INTO characters (name, movie) VALUES (?, ?)");
  
  characters.forEach(character => {
    stmt.run(character.name, character.movie, (err) => {
      if (err) {
        console.error(`Error inserting ${character.name}: ${err.message}`);
      } else {
        console.log(`Inserted: ${character.name} from ${character.movie}`);
      }
    });
  });

  stmt.finalize();
});

// Cerrar la conexión a la base de datos
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database connection closed.');
});
