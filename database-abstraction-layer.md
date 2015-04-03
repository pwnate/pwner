pwner-database
==============

# example

```js
var Database = require('pwner-database')

var db = Database({
	host: 'localhost',
	user: 'root'
})

db.on('engineer', function (id) {
	console.log('engineer updated/added')
})

db.createEngineer({
	name: 'pwnate'
})
```

# api

```js
var Database = require('pwner-database')
```

## `Database(connectionOpts)`

- `connectionOpts` is the object/string passed into [node-mysql](https://github.com/felixge/node-mysql#connection-options).
- Returns a `db` object.

## `db`

`db` is an event emitter with the following methods:

### `db.createProject(opts)`

- Automatic: `date_created` (module level), `project_id` (database level)
- Required: `contact_id`, `name`, `engineering_project`, `printing_project`, `active_project_state_id`, `done`, `payment_received`
- Optional: `engineer_id`, `start_date`, `done_date`, `dead_reason`, `quoted_engineering_hours`, `engineering_due_date`, `actual_engineering_hours`, `print_parts`, `print_quantity`, `print_time_hours`, `print_due_date`, `contact_date`, `reply_date`, `quote_date`, `follow_up_date`, `notes`

### `db.createContact(opts)`

- Automatic: `date_created` (module level), `contact_id` (database level)
- Optional: `email_address`, `first_name`, `last_name`, `organization`, `phone`, `address`, `city`, `state`, `zip_code`, `notes`, `preferred_contact_method`

### `db.createEngineer(opts)`

- Automatic: `engineer_id` (database level)
- Required: `name`

--------

### `db.updateProject(opts)`

- Required: `project_id`
- Optional: `contact_id`, `name`, `engineering_project`, `printing_project`, `active_project_state_id`, `done`, `payment_received`, `engineer_id`, `start_date`, `done_date`, `dead_reason`, `quoted_engineering_hours`, `engineering_due_date`, `actual_engineering_hours`, `print_parts`, `print_quantity`, `print_time_hours`, `print_due_date`, `contact_date`, `reply_date`, `quote_date`, `follow_up_date`, `notes`

### `db.updateContact(opts)`

- Required: `contact_id`
- Optional: `date_created`, `email_address`, `first_name`, `last_name`, `organization`, `phone`, `address`, `city`, `state`, `zip_code`, `notes`, `preferred_contact_method`

### `db.updateEngineer(opts)`

- Required: `engineer_id`
- Optional: `name`

### events

- `project` is emitted when a project is added or updated.
	- `id` is the `project_id`.
- `contact` is emitted when a contact is added or updated.
	- `id` is the `contact_id`.
- `engineer` is emitted when an engineer is added or updated.
	- `id` is the `engineer_id`.
