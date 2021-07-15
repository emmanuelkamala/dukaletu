import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();

const MONGO_URI = 'mongodb+srv://ejoka:tanzania@cluster0.zlvvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

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
