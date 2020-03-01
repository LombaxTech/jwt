const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test123@ds147946.mlab.com:47946/jwtauth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch(e => console.error(`error: ${e}`))

app.use(express.json());

// * routes 
const authRoute = require('./routes/auth');

// * middleware for routes
app.use('/api/user', authRoute);


app.get('/', (req, res) => {
    res.send('hello');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`started listening on port ${PORT}`));