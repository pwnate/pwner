var dbEng = require('../query/db-engineer.js')
var q = require('sql-concat')

var eng = {
	engineerId: 9,
	name: 'coolest!'
}

dbEng.insert(eng).then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

eng = {
	engineerId: 9,
	name: 'coolish'
}

dbEng.update(eng).then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

dbEng.findEngineerByName('cool').then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

dbEng.returnAll().then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})
