/*
DROP TABLE project;
DROP TABLE contact;
DROP TABLE engineer;
DROP TABLE active_project_state;
*/

CREATE DATABASE pwner;

USE pwner;

CREATE TABLE project (
	project_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	contact_id INT UNSIGNED NOT NULL,
	date_created DATETIME NOT NULL,
	engineer_id INT UNSIGNED,
	name VARCHAR(200) NOT NULL,
	engineering_project BIT(1) NOT NULL,
	printing_project BIT(1) NOT NULL,
	active_project_state_id INT UNSIGNED NOT NULL,
	start_date DATETIME,
	done BIT(1) NOT NULL,
	done_date DATETIME,
	dead_reason TEXT,
	quoted_engineering_hours DECIMAL(5,1),
	actual_engineering_hours DECIMAL(5,1),
	engineering_due_date DATE,
	print_parts TEXT,
	print_quantity MEDIUMINT,
	print_time_hours DECIMAL(5,1),
	print_due_date DATE,
	payment_received BIT(1) NOT NULL,
	contact_date DATE,
	reply_date DATE,
	quote_date DATE,
	follow_up_date DATE,
	notes TEXT,
	PRIMARY KEY (project_id),
	INDEX client (contact_id),
	INDEX engineer (engineer_id),
	INDEX done_lead (done, active_project_state_id)
);

CREATE TABLE contact (
	contact_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	date_created DATETIME NOT NULL,
	email_address VARCHAR(200),
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	organization VARCHAR(200),
	phone VARCHAR(100),
	address VARCHAR(100),
	city VARCHAR(100),
	state VARCHAR(50),
	zip_code VARCHAR(20),
	notes TEXT,
	preferred_contact_method VARCHAR(100),
	PRIMARY KEY(contact_id)
);

CREATE TABLE engineer (
	engineer_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (engineer_id),
	UNIQUE KEY (name)
);

CREATE TABLE active_project_state (
	active_project_state_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	clear_start_date BIT(1) NOT NULL,
	project_is_started BIT(1) NOT NULL,
	approved_project BIT(1) NOT NULL,
	requires_engineer BIT(1) NOT NULL,
	PRIMARY KEY (active_project_state_id),
	UNIQUE KEY (name)
);

INSERT INTO active_project_state (name, clear_start_date, project_is_started, approved_project, requires_engineer) VALUES
	('Lead', TRUE, FALSE, FALSE, FALSE),
	('Approved', FALSE, FALSE, TRUE, FALSE),
	('Waiting for client approval', FALSE, TRUE, TRUE, TRUE),
	('Engineering', FALSE, TRUE, TRUE, TRUE),
	('Ready to print', FALSE, TRUE, TRUE, TRUE);
