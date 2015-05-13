var dbContact = require('../query/db-contact.js')
var q = require('sql-concat')

var contact = {
	contactId: 1,
	dateCreated: new Date('2014-12-31 23:59:59'),
	firstName: 'Billy',
	lastName: 'Buddy',
	version: 1
}


dbContact.insert(contact).then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

contact = {
	contactId: 1,
	emailAddress: 'billybuddy@awesome.com',
	phone: '123-456-7890',
	version: 1
}

dbContact.update(contact).then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

dbContact.findContactByName('bo').then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})

dbContact.returnAll().then(function(res){
	console.log(res)
}, function(res){
	console.log(res)
})
