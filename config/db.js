import pool from '.';

pool.on('connect', () => {
  console.log('connected to the db');
});

const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN
      )`;

      const tableNames = [
        {
          name: 'users',
          query: queryText
        },
    ];

    const createTables = async (name, query) => {
        try{
        await pool.query(query);
        return `${name} table created successfully!`;
        } catch (error) {
          return `${name} table Failed to create!`;
        }
      };
      
      const setupTables = async () => {
        await Promise.all(
          tableNames.map(({ name, query }) => createTables(name, query))
        );
        await pool.end();
      };
      
      /**
       * Drop Tables
       */
       const dropTables = () => {
       const queryText = 'DROP TABLE IF EXISTS users';
      pool.query(queryText)
         .then((res) => {
          console.log(res);
        pool.end();
         })
        .catch((err) => {
           console.log(err);
           pool.end();
           });
           }
      
      module.exports = {
        setupTables,
        dropTables
      };
      
      require('make-runnable');