const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/notesRoute');
const aiRoutes = require('./routes/aiRoutes');
const errorHandler = require('./middleware/error.middleware');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes',noteRoutes);
app.use('/api/ai',aiRoutes);
// app.get("/", (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to AI Notes Assistant Backend"
//     });
// });
app.use(errorHandler);//Global Middleware
module.exports = app;