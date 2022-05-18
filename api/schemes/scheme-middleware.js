const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;

  const scheme = await Schemes.findById(scheme_id)

  if (scheme) {
    next();
  } else {
    next({ status: 404, message: `scheme with scheme_id ${scheme_id} not found` });
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if (!scheme_name || typeof(scheme_name) !== 'string' || scheme_name.trim() === '') {
    next({ message: 'invalid scheme_name' });
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;

  if ((!instructions || instructions.trim() === '' || typeof(instructions) !== 'string') 
    || (typeof(parseInt(step_number) !== 'number') || parseInt(step_number) < 1)) {
    next({ status: 400, message: 'invalid step' })
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
