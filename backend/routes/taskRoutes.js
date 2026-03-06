const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(
        [
            body('title').notEmpty().withMessage('Title must not be empty'),
            body('description').optional().trim()
        ],
        validateRequest,
        createTask
    );

router.route('/:id')
    .put(
        [
            body('title').optional().notEmpty().withMessage('Title must not be empty'),
            body('description').optional().trim()
        ],
        validateRequest,
        updateTask
    )
    .delete(deleteTask);

module.exports = router;
