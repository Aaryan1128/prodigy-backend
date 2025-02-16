// prodigy-backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Task Schema
const taskSchema = new mongoose.Schema({
    title: String,
    userId: String, // Add userId field
});

const Task = mongoose.model('Task', taskSchema);

// Define Note Schema
const noteSchema = new mongoose.Schema({
    content: String,
    userId: String, // Add userId field
});

const Note = mongoose.model('Note', noteSchema);

// API Endpoints
app.get('/api/tasks/:userId', async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.get('/api/notes/:userId', async (req, res) => {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});