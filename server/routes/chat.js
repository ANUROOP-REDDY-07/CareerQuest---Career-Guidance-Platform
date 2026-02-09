const express = require('express');
const router = express.Router();

// Mock AI response logic
const getAIResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('roadmap') || msg.includes('path')) {
        return "To provide a roadmap, I need to know which career you are interested in. You can ask about 'Software Engineer roadmap' or 'Doctor path'.";
    }
    if (msg.includes('software') || msg.includes('coding')) {
        return "For Software Engineering, focus on Computer Science fundamentals, pick a language like Python or Java, and build projects. Do you want a specific roadmap for Frontend or Backend?";
    }
    if (msg.includes('doctor') || msg.includes('medical')) {
        return "Becoming a Doctor requires clearing NEET, completing MBBS (5.5 years), and then post-graduation. It's a long but rewarding journey!";
    }
    if (msg.includes('salary') || msg.includes('earn')) {
        return "Salaries vary by field and experience. Tech and Medicine generally offer high starting packages in India.";
    }
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! I am your AI Career Mentor. I can help you with roadmaps, skills, and career doubts. What's on your mind?";
    }

    return "That's an interesting question. I can help you find roadmaps and specialized career paths. Could you be more specific?";
};

router.post('/', (req, res) => {
    const { message } = req.body;

    // Simulate AI delay
    setTimeout(() => {
        const response = getAIResponse(message || '');
        res.json({ reply: response });
    }, 1000);
});

module.exports = router;
