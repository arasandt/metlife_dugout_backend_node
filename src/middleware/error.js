module.exports = (app) => {
    app.use(function (req, res, next) {
        next(new Error("not found"))
    });

    app.use(function (err, req, res, next) {
        res.status(500).json({
            message: err.message,
            error: err
        });
    });
}
