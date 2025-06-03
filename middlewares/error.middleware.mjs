

export default function errorHandler(err, req, res, next) {

    console.error('Error:', err.stack || err.message);
    const status = err.status || 500;

    res.status(status).json({
        message: err.message || 'Internal Server Error',
        status,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}
