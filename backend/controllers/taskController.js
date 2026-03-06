const Task = require('../models/Task');

// @desc    Get tasks
// @route   GET /api/v1/tasks
// @access  Private
const getTasks = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'admin') {
            query = Task.find();
        } else {
            query = Task.find({ createdBy: req.user.id });
        }

        const tasks = await query
            .populate('createdBy', 'name email role')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        next(error);
    }
};


// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
const createTask = async (req, res, next) => {
    try {

        req.body.createdBy = req.user.id;

        const task = await Task.create(req.body);

        // populate createdBy before sending response
        const populatedTask = await Task.findById(task._id)
            .populate('createdBy', 'name email role');

        res.status(201).json({
            success: true,
            data: populatedTask
        });

    } catch (error) {
        next(error);
    }
};



// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
    try {

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Authorization
        if (
            task.createdBy.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this task'
            });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('createdBy', 'name email role');

        res.json({
            success: true,
            data: task
        });

    } catch (error) {
        next(error);
    }
};



// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Authorization
        if (
            task.createdBy.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this task'
            });
        }

        await task.deleteOne();

        res.json({
            success: true,
            data: {}
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};