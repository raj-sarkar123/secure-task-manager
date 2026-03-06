// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
        errors: err.errors || undefined
    });
};

module.exports = errorHandler;
