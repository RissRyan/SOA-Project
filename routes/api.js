const express = require("express");

const apiRouter = express.Router();

apiRouter.get('/ping', function (req, res) {
    res.json({
        status: "OK",
        timestamp: (new Date()).getTime()
    });
});

module.exports = apiRouter;