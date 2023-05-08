const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./Route/userRoutes');
const dotenv = require('dotenv');
const connectToDB = require('./database/connection');

// Configure env
dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoute);
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send({message: "Welcome to ecommerce app"});
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async()=>{
    console.log(`Our server is running on ${PORT}`);
    await connectToDB();
})