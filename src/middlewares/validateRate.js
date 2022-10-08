const validateRate = (req, res, next) => {
    const { rate } = req.body.talk;
    console.log(rate);
if (!rate) {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
}
if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};

module.exports = validateRate;