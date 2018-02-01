const ReactApp = require('./reactApp')

ReactApp.methods(['get', 'post', 'put', 'delete'])
ReactApp.updateOptions({new: true, runValidators: true}) //Return the entity updated, not the old one when update and validate all fields

module.exports = ReactApp