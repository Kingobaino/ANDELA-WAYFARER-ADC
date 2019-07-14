import express from 'express';
import bodyParser from 'body-parser';
import v1Router from './routes/users';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use('/api/v1', v1Router);

app.listen(port, () => {
   console.log(`I love You at PORT ${port}`);
});

export default app;
