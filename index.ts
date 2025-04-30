import dotenv from 'dotenv';
import express from 'express';

// Load environment variables from the mounted .env file in Kubernetes
dotenv.config({
    path: '/app/secret/.env', // Correct path to the .env file
});

const app = express();

console.log(process.env.DATABASE_URL); // Check if env variables are loaded
console.log(process.env.PORT); // Check if env variables are loaded

app.get("/", (req, res) => {
    res.json({
        db: process.env.DATABASE_URL,
        port: process.env.PORT
    });
});

app.get("/user", (req, res) => {
    res.json({
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      }
    });
  });
  

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
