module.exports = {
  handleValidationError: (err) => {
    return { error: 'Validation failed', details: err.message };
  }
};
