const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({ "string.empty": 'The "keyword" field is required' }),
    title: Joi.string()
      .required()
      .messages({ "string.empty": 'The "title" field is required' }),
    description: Joi.string()
      .required()
      .messages({ "string.empty": 'The "text" field is required' }),
    publishedAt: Joi.string()
      .required()

      .messages({ "string.empty": 'The "date" field is required' }),
    source: Joi.object()
      .required()
      .messages({ "string.empty": 'The "source" field is required' }),
    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'The "link" field must be a valid url',
    }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid url',
    }),
    isSaved: Joi.boolean()
      .required()
      .messages({ "string.empty": 'The "isSaved" field is required' }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": ' The "Email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "Username" field is 2',
      "string.max": 'The maximum length of the "Username" field is 30',
      "string.empty": 'The "Username" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": ' The "Email" field must be a valid email address',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex().messages({
      "string.empty": 'The "articleId" field is required',
      "string.length": 'The required length of the "articleId" field is 24',
      "string.hex": 'The "articleId" field must be in valid format',
    }),
  }),
});
