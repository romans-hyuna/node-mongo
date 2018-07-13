module.exports = {
    handleError: (res) => {
        return (err) => {
            return res.status(400).json({message: err.message});
        }
    }
};