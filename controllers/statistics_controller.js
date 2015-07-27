var models = require('../models/models.js');

var estadisticas = {
         numPreguntas: 0,
         numComentarios: 0,
         numPreguntasComentadas: 0
};



 // GET /quizes/statistics
exports.index = function(req,res){
  models.Quiz.count()
  .then(function (numQuizes) { // número de preguntas
    estadisticas.numPreguntas = numQuizes;
    return models.Comment.count();
  })
  .then(function (numComments) { // número de comentarios
    estadisticas.numComentarios = numComments;
    return models.Comment.countCommentedQuizes();
  })
  .then(function (numQuestionsWithComments) { // número de preguntas con comentarios
    estadisticas.numPreguntasComentadas = numQuestionsWithComments;
  })
  .catch(function(error){next(error)})
  .finally(function () {
		res.render('statistics/index', { estadisticas: estadisticas, errors: [] });
  });

};