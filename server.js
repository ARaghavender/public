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

// Route to serve index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'index.html'));
});

// Handle form submission
server.post('/submit', (req, res) => {
  const { adjective1, noun1, verb1, adverb, adjective2, noun2, verb2 } = req.body;

  if (!adjective1 || !noun1 || !verb1 || !adverb || !adjective2 || !noun2 || !verb2) {
    return res.status(400).send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/">Go Back to Form</a>
    `);
  }

  const story = `
    The ${adjective1} ${noun1} ${verb1} ${adverb} through the forest.
    Suddenly, it encountered a ${adjective2} ${noun2} blocking its path.
    The ${noun1} didn't know what to do at first.
    After a moment of hesitation, it decided to ${verb2} around the obstacle.
    This unexpected adventure made the ${noun1} realize that sometimes,
    the most interesting journeys are the ones we don't plan.
    From that day on, the ${noun1} always looked forward to new challenges,
    knowing that each one was an opportunity for growth and excitement.
  `;
  res.send(`
    <h1>Submission Successful</h1>
    <p>${index}</p>
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
