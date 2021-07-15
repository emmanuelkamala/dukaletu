import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Emmanuel',
      email: 'emmanuelkamala86@gmail.com',
      password: bcrypt.hashSync('tanzania', 8),
      isAdmin: true,
    },
    {
      name: 'Angelina',
      email: 'angelinanyamwihula@gmail.com',
      password: bcrypt.hashSync('tanzania', 8),
      isAdmin: false,
    }
  ],

  products: [
    {
      _id: 1,
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 50000,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality product',
    },
    {
      _id: 2,
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 70000,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4,
      numReviews: 100,
      description: 'High quality product',
    },
    {
      _id: 3,
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 65000,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'High quality product',
    },
    {
      _id: 4,
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 30000,
      countInStock: 15,
      brand: 'Nike',
      rating: 5,
      numReviews: 16,
      description: 'High quality product',
    },
    {
      _id: 5,
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 40000,
      countInStock: 12,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality product',
    },
    {
      _id: 6,
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 45000,
      countInStock: 5,
      brand: 'Adidas',
      rating: 4,
      numReviews: 50,
      description: 'High quality product',
    },
  ]
}

export default data;