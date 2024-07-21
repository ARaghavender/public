
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001; // You can change the port if needed

// Serve the script.js file


// Serve CSS files with the appropriate MIME type
app.get('/ITC505/lab-7/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'style.css'));
});
// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/ITC505/lab-7',express.static(path.join(__dirname, 'public')));
app.get('/ITC505/lab-7/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505','lab-7', 'index.html'));
});


// Handle form submission
app.post('/submit', (req, res) => {
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
    <h1>Your Mad Lib Story</h1>
    <p>${story}</p>
    <a href="/ITC505/lab-7/index.html">You want to try again</a>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Determine the port to listen on
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}
// Start the app
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
