module.exports = (route, req, res) => {
    route(req, (status, result) => {
        res.status(status);
        res.json(result).end();
    });
};
