var db = require('db')
var q = require('sql-concat')
var Joi = require('joi')
var Promise = require('promise')
var snakeize = require('snakeize')
var camelize = require('camelize')

var schema = Joi.object({
	engineerId: Joi.number().integer().max(4294967295).min(0),
	name: Joi.string().max(100)
})

var validateDbEngineer = Promise.denodeify(function validate(o, cb) {
    schema.validate(o, cb)
})

var columns = 'engineer_id, name'

function insert(engineer) {
	return validateDbEngineer(engineer)
		.then(function(validatedEngineer){
			return db().query('INSERT INTO engineer SET ?', snakeize(validatedEngineer)).then(function(res){
				validatedEngineer.engineerId = res.insertId
				return validatedEngineer
			})
		})
}

function update(engineer) {
	return validateDbEngineer(engineer)
		.then(function(validatedEngineer){
			return db().query('UPDATE engineer SET ? WHERE engineer_id = ?', [snakeize(validatedEngineer), validatedEngineer.engineerId])		
		})
	
}

function findEngineerByName(name) {
	return db().query(q.select(columns).from('engineer').whereLike('name', '%' + name + '%')).then(camelize)
}

function returnAll () {
	return db().query(q.select(columns).from('engineer')).then(camelize)
}

module.exports = {
	insert: insert,
	update: update,
	findEngineerByName: findEngineerByName,
	returnAll: returnAll
}
