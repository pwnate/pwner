var dbEngineer = require('./db-engineer.js')

module.exports = function (db, getMediator) {
	var context = getMediator()

	context.subscribe('db:create engineer', function(engineer, cb) {
		dbEngineer.create(db, engineer, function(err, engineer) {
			cb(err, engineer)
			if (!err) {
				context.publish('db:new engineer', engineer)
			}
		})
	})
}
