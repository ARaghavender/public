const express = require('express');
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
const server = express();

// Middleware
server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the 'ITC505/lab-7' directory
server.use(express.static(path.join(__dirname, 'ITC505', 'lab-7')));

// Favicon route
server.get('/favicon.ico', (req, res) => res.status(204));

// Route to serve madlib.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'madlib.html'));
});

// Handle form submission
server.post('/submit', (req, res) => {
  const { adjective1, pluralNoun, verb, place, adjective2 } = req.body;

  if (!adjective1 || !pluralNoun || !verb || !place || !adjective2) {
    return res.status(400).send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
  }

  const madLib = `It was a(n) ${adjective1} day. The ${pluralNoun} decided to ${verb} to the ${place}. It was a very ${adjective2} experience.`;

  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Determine the port to listen on
const port = process.argv[2] === 'local' ? 8085 : 80;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
