import pool from ".";

pool.on("connect", () => {
  console.log("connected to the db");
});

const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN
      )`;

const tripQueryText = `
  CREATE TABLE IF NOT EXISTS trip(
    id SERIAL PRIMARY KEY,
    bus_id VARCHAR(124),
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    trip_date TEXT,
    fare FLOAT(2) NOT NULL,
    status FLOAT(2) NOT NULL
  )
`;
const bookingQueryText = `
  CREATE TABLE IF NOT EXISTS booking(
    id SERIAL PRIMARY KEY,
    bus_id TEXT NOT NULL,
    trip_id TEXT NOT NULL,
    user_id VARCHAR NOT NULL,
    created_on TIMESTAMP NOT NULL
  )
`;
const busQueryText = `CREATE TABLE IF NOT EXISTS bus(
 bus_id SERIAL PRIMARY KEY,
 number_plate VARCHAR(20) NOT NULL UNIQUE,
 manufacturer VARCHAR(128) NOT NULL,
 model VARCHAR(128) NOT NULL,
 year VARCHAR(20) NOT NULL,
 capacity INTEGER NOT NULL
)
`;
const tableNames = [
  {
    name: "users",
    query: queryText
  },
  {
    name: "bus",
    query: busQueryText
  },
  {
    name: "trips",
    query: tripQueryText
  },
  {
    name: "booking",
    query: bookingQueryText
  }
];

const createTables = async (name, query) => {
  try {
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
  const queryText = "DROP TABLE IF EXISTS users, trip, booking, bus";
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  setupTables,
  dropTables
};

require("make-runnable");
