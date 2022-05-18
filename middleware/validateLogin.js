// Referencias https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

const validateLogin = (request, response, next) => {
  const { email, password } = request.body;
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const functionRegex = RegExp(regex);
  if (!password) {
    return response.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return response.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!email) {
    return response.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  } if (!functionRegex.test(email)) {
    return response.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } return next();
};

module.exports = validateLogin;
