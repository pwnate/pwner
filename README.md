# pwner
Custom excel. Replacing spreadsheets like nobody's business.


## Views

### Active Projects

All active projects (!done, active_project_state has project_is_started OR approved_project), including

- engineer
- contact
- project
- engineering due date
- quoted hours (?)
- type (?)
- status (?)

### Project Leads

All projects that are just leads and not approved by the client to start (!done, active_project_state has !project_is_started AND !approved_project), including

- contact
- project
other lead related info?


### Engineer Hours

Number of hours on active projects per engineer

### Pending Payment

All completed projects that require payment

done and !payment_recieved
