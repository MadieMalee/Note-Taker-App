const express = require('express');
const path = require('path');

const app = express();

// Start the server
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require('./api');

app.use('/api', apiRoutes);

//Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Serve notes.html for GET /notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

