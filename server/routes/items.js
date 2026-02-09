const express = require('express');
const router = express.Router();
const { Career, Question, Roadmap, CollegeExam } = require('../models/models');

// Get all careers
router.get('/careers', async (req, res) => {
    try {
        const careers = await Career.find();
        res.json(careers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single career
router.get('/careers/:id', async (req, res) => {
    try {
        const career = await Career.findOne({ id: req.params.id });
        if (!career) return res.status(404).json({ message: 'Career not found' });
        res.json(career);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all roadmaps
router.get('/roadmaps', async (req, res) => {
    try {
        const roadmaps = await Roadmap.find();
        res.json(roadmaps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all colleges/exams
router.get('/colleges', async (req, res) => {
    try {
        const items = await CollegeExam.find();

        // Separate into exams and colleges structure to match frontend expectation
        const exams = items.filter(item => item.type === 'Exam');
        const colleges = items.filter(item => item.type === 'College');

        res.json({ exams, colleges });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
