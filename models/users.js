import dotenv from "dotenv";
import pool from "../config";

dotenv.config();

const create = async data => {
  const { first_name, last_name, email, password, is_admin } = data;
  const newItem = await pool.query(
    `INSERT INTO users(
      first_name, last_name, email, password, is_admin
      ) 
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [first_name, last_name, email, password, is_admin]
  );
  return newItem.rows[0];
};

const createTrip = async data => {
  const { bus_id, origin, destination, trip_date, fare, token, is_admin, user_id } = data;
  const newItem = await pool.query(
    `INSERT INTO trip(
      bus_id, origin, destination, trip_date, fare, token, is_admin, user_id
      ) 
     VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [bus_id, origin, destination, trip_date, fare, token, is_admin, user_id]
  );
  return newItem.rows[0];
};

const booking = async data => {
  const {trip_id, token} = data;
  const newItem = await pool.query(
    `INSERT INTO booking(
      trip_id, token
      ) 
     VALUES($1, $2, $3, $4) RETURNING *`,
    [trip_id, token]
  );
  return newItem.rows[0];
};

const findOne = async email => {
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email
  ]);
  return user.rows[0];
};

const findAll = async () => {
  const user = await pool.query(`SELECT * FROM trip ORDER BY id ASC`);
  return user.rows;
};

const viewAllBookings = async () => {
  const user = await pool.query(`SELECT * FROM booking ORDER BY id ASC`);
  return user.rows;
}
 
export { create, findOne, createTrip, findAll, booking, viewAllBookings };
