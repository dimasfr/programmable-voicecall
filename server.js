const express = require('express');
const path = require('path')
var cors = require("cors");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// CORS
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/call', require('./routes/api/call'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));