const validatePassword = (req, res, next) => {
    const validPassword = req.body.password;
    if (!validPassword) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
      } if (validPassword.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
       next();
    };

    module.exports = validatePassword;