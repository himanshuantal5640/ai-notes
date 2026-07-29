const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/notesRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes',noteRoutes);
// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to AI Notes Assistant Backend"
//     });
// });

module.exports = app;