module.exports = {
    get: (req, res) => {
        res.status(200).send('get uuid.');
    },
    patch: (req, res) => {
        res.status(200).send('patch uuid.');
    },
    delete: (req, res) => {
        res.status(200).send('delete uuid.');
    }
}