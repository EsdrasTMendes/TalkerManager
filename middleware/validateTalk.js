const validateTalk = (request, response, next) => {
  const { talk } = request.body;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const dateRegex = RegExp(regex);
  if (!talk || !talk.watchedAt || !talk.rate) {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório e "watchdAt" e "rate" não podem estar vazios' });
  }
  if (+talk.rate < 1 || +talk.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!dateRegex.text(talk.watchedAt)) {
    return response.status().json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = validateTalk;
