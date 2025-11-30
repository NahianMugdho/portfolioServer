const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');

// Using Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/blogs', blogRoutes);
app.use('/team-members', teamMemberRoutes);

// Root test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
