const express = require("express");
const path = require("path");

function announceTime(clock) {
  clock = clock || Date
  return 'It is now ' + clock.now()
}

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set port
const PORT = process.env.PORT || 80;

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
