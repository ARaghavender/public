const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the root directory (which should be 'Public')
server.use(express.static(__dirname));

// Routes

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve the madlib.html file from the ITC505/lab-7 directory
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'madlib.html'));
});

// Handle Mad Libs form submission
server.post('/submit', (req, res) => {
  const { adjective1, pluralNoun, verb, place, adjective2 } = req.body;

  if (!adjective1 || !pluralNoun || !verb || !place || !adjective2) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `It was a(n) ${adjective1} day. The ${pluralNoun} decided to ${verb} to the ${place}. It was a very ${adjective2} experience.`;

  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});

// Determine the port to listen on
let port = 80;
if (process.argv[2] === 'local') {
  port = 8085;
}

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
