const validateRate = (request, response, next) => {
  const { talk } = request.body;
  if (+talk.rate < 1 || +talk.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = validateRate;