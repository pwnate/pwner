var dbContact = require('../query/db-contact.js')
var q = require('sql-concat')

var contact = {
	dateCreated: '2014-01-01 01:05:00',
	firstName: 'Billy',
	lastName: 'Buddy',
	version: 1
}


dbContact.insert(contact).then(function(res){
	console.log(res)
}, function(res){
	console.log('error:' + res)
})

// contact = {
	
// }

// dbContact.update(contact).then(function(res){
// 	console.log(res)
// }, function(res){
// 	console.log(res)
// })

// dbContact.findContactByName('cool').then(function(res){
// 	console.log(res)
// }, function(res){
// 	console.log(res)
// })

// dbContact.returnAll().then(function(res){
// 	console.log(res)
// }, function(res){
// 	console.log(res)
// })
