const express = require('express');
const router = express.Router();
const { Career, Question, Roadmap, CollegeExam } = require('../models/models');

// Get all careers
router.get('/careers', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const total = await Career.countDocuments(query);
        const careers = await Career.find(query).skip(skip).limit(limit);

        res.json({
            careers,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
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
// Get all colleges/exams with pagination
router.get('/colleges', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const type = req.query.type; // Optional: filter by type ('Exam' or 'College')

        let query = {};
        if (type) {
            query.type = type;
        }

        const search = req.query.search || '';
        if (search) {
            // We need to be careful not to overwrite the 'type' in query if it exists,
            // but $or is a top-level operator in MongoDB query syntax.
            // If we have both type and $or, MongoDB handles it as implicit AND.
            // So structure should be { type: '...', $or: [...] }
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { stream: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await CollegeExam.countDocuments(query);
        const items = await CollegeExam.find(query).skip(skip).limit(limit);

        // Separate into exams and colleges structure if no type filter is applied,
        // or just return the filtered list.
        // To maintain backward compatibility with frontend structure { exams, colleges },
        // we might need to adjust. However, for pagination, it's better to return a flat list
        // or segmented lists based on the requested type.

        // Strategy: If 'type' is provided, return paginated list of that type.
        // If no 'type' provided, we can't easily paginate two different lists in one query effectively
        // without complex aggregation or two queries.
        // For simplicity and performance, let's assume the frontend will now request specifics 
        // OR we just return the mixed paginated list and let frontend filter (not ideal for huge datasets but better than all).

        // Let's go with: Support 'type' filter. If not provided, return mixed.
        // Frontend will need to be updated to request specific types or handle mixed.

        const exams = items.filter(item => item.type === 'Exam');
        const colleges = items.filter(item => item.type === 'College');

        res.json({
            items, // Return all valid items for the page
            exams, // Convenience separation
            colleges, // Convenience separation
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
