import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routes/userRouter.js';

const app = express();

const MONGO_URI = 'mongodb+srv://ejoka:tanzania@cluster0.zlvvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(prod => prod._id === parseInt(req.params.id));
 
  if (product){
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product Not Found' })
  }
})

app.get('/api/products', (req, res) => {
  res.send(data.products);
})

app.use('/api/users', userRouter)

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
