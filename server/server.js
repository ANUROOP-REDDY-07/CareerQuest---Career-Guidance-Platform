const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career-guidance', {
    // These options are deprecated in newer mongoose versions but good for compatibility if needed
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes (Placeholder)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const itemRoutes = require('./routes/items');
const chatRoutes = require('./routes/chat');
app.use('/api', itemRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
