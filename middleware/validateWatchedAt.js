const validateWatchedAt = (request, response, next) => {
  const { talk } = request.body;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!regex.test(talk.watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

  module.exports = validateWatchedAt;