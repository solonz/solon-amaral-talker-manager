const validateEmail = (req, res, next) => {
    const validEmail = req.body.email;
    const regexEmail = /\S+@\S+\.\S+/;
      if (!validEmail) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      } if (!regexEmail.test(validEmail)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
        next();
    };

    module.exports = validateEmail;