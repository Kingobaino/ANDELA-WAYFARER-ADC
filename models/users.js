import dotenv from 'dotenv';
import pool from '../config';

dotenv.config();

const create = async (data) => {
  const {
    firstname, lastname, email, password, is_admin
  } = data;
  const newItem = await pool.query(
    `INSERT INTO users(
      first_name, last_name, email, password, is_admin
      ) 
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [firstname, lastname, email, password,  is_admin]
  );
  return newItem.rows[0];
};

const createTrip = async (data) => {
  const {
    busId, origin, destination, tripdate, fare, status
  } = data;
  const newItem = await pool.query(
    `INSERT INTO trip(
      bus_id, origin, destination, trip_date, fare, status
      ) 
     VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [busId, origin, destination, tripdate, fare, status]
  );
  return newItem.rows[0];
};

 const findOne = async (email) => {   
 const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);  
   return user.rows[0];
  };

  const matchOne = async (email) => {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user.rows[0];
  }

  export { create, findOne, matchOne, createTrip};