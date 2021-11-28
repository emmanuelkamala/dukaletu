import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const MONGO_URI = 'mongodb://ejoka:tanzania@cluster0-shard-00-00.b7wu8.mongodb.net:27017,cluster0-shard-00-01.b7wu8.mongodb.net:27017,cluster0-shard-00-02.b7wu8.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-spxmls-shard-0&authSource=admin&retryWrites=true&w=majority';


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
  res.send('Server is ready');
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);


//app.listen(PORT, console.log(`Server started on port: ${PORT}`));
