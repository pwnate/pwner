var dbProject = require('../query/db-project.js')
var q = require('sql-concat')
var extend = require('xtend')

var project = {
	contactId: 1,
	dateCreated: new Date(),
	name: 'the coolest project evar!',
	engineeringProject: true,
	printingProject: false,
	activeProjectStateId: 2,
	done: false,
	paymentReceived: false,
	version: 1
}

var projectUpdate = {}

dbProject.insert(project).then(function(res){
	projectUpdate.projectId = res.projectId
	console.log(res)
}, function(res){
	console.log(res)
}).then(function(res){
	projectUpdate = extend(projectUpdate,{
		name: 'okay, it\'s not all that cool',
		printingProject: true,
		paymentReceived: true,
		version: 1
	})
	console.log(projectUpdate)
	dbProject.update(projectUpdate).then(function(res){
		console.log(res)
	}, function(res){
		console.log(res)
	})
},function(res){
	console.log(res)
}).then(function(res){
	dbProject.findProjectByName('oka').then(function(res){
		console.log(res)
	}, function(res){
		console.log(res)
	})
},function(res){
	console.log(res)
})


// dbProject.returnAll().then(function(res){
// 	console.log(res)
// }, function(res){
// 	console.log(res)
// })
