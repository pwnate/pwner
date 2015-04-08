module.exports = {
	create: function createEngineer(db, engineer, cb) {
		// Must validate engineer
		db.query('INSERT INTO engineers SET ??', engineer, function (err, result) {
			if (!err) {
				engineer.engineer_id = result.insertId
				cb(null, engineer)
			} else {
				cb(err)
			}
		}
	},
	update: function updateEngineer(db, engineer, cb) {
		//db.query('UPDATE or something')
	},
	get: function getEngineer(db, engineerId, cb) {
		db.query('SELECT name FROM engineers WHERE engineer_id = ??', engineerId, cb)
	}
}
