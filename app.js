const express = require("express");
const app = express();
const dotenv = require('dotenv');
//const bodyParser = require('body-parser')
const mongoose=require('mongoose');
dotenv.config({ path: './config.env' });
mongoose.connect('mongodb://127.0.0.1:27017/myVotingApp').then(()=>{
    console.log("Local Mac Database Connected");
}).catch((error)=>{
    console.log(error);
})
/*const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Online Mongo Database connection successful!'))
    .catch((error) => console.error('MongoDB connection error:', error));*/

const adminRoutes = require('./server/routes/admin');
const authRoutes = require('./server/routes/auth');
const candidateRoutes = require('./server/routes/candidate');
const voterRoutes = require('./server/routes/voter');

const port = 3000;
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/voter', voterRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Unexpected error occurred" });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
