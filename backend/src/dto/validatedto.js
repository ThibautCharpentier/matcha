const validateDto = (DtoClass) => (req, res, next) => {
    try {
        const dtoInstance = new DtoClass(req.body);
        dtoInstance.validate();
        req.body = dtoInstance;
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { validateDto };
