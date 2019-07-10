CREATE TABLE `Validation_Requests` (
	`vr_id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`swarm_id` varchar(255) NOT NULL UNIQUE,
	`company_id` varchar(50),
	`category` varchar(255) NOT NULL,
	`request_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`vr_id`)
)AUTO_INCREMENT=0;

alter table Validation_Requests auto_increment=0;

CREATE TABLE `Users` (
	`user_id` varchar(50) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(50) NOT NULL,
	`dob` DATE NOT NULL,
	`about` TEXT(360),
	`skills` TEXT,
	`status` bool NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `Company` (
	`company_id` varchar(50) NOT NULL,
	`name` TEXT NOT NULL,
	`email_id` varchar(60) NOT NULL,
	`description` TEXT(600) NOT NULL,
	`website` varchar(600) NOT NULL,
	`industry` TEXT(100) NOT NULL,
	`hq` TEXT(200) NOT NULL,
	PRIMARY KEY (`company_id`)
);

CREATE TABLE `Experience` (
	`user_id` varchar(50) NOT NULL,
	`job_title` varchar(60) NOT NULL,
	`organisation` varchar(100) NOT NULL,
	`from` DATE NOT NULL,
	`to` DATE NOT NULL,
	`swarm_id` varchar(255) NOT NULL,
	`description` TEXT(100) NOT NULL,
	`status` varchar(255) NOT NULL,
	`expiry` varchar(255) ,
	`txn_hash` varchar(255),
	PRIMARY KEY (`swarm_id`)
);

CREATE TABLE `Education` (
	`user_id` varchar(50) NOT NULL,
	`institution` varchar(200) NOT NULL,
	`swarm_id` varchar(255) NOT NULL,
	`from` DATE NOT NULL,
	`to` DATE NOT NULL,
	`description` TEXT(100) NOT NULL,
	`level` varchar(100) NOT NULL,
	`status` varchar(255) NOT NULL,
	`txn_hash` varchar(255),
	PRIMARY KEY (`swarm_id`)
);

CREATE TABLE `Category` (
	`wallet_address` varchar(50) NOT NULL,
	`category` varchar(20) NOT NULL,
	PRIMARY KEY (`wallet_address`)
);

CREATE TABLE `Job_Post` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`description` varchar(1000) NOT NULL,
	`type` varchar(100) NOT NULL,
	`salary` varchar(100) NOT NULL,
	`industry` varchar(100) NOT NULL,
	`designation` varchar(100) NOT NULL,
	`experience` varchar(100) NOT NULL,
	`duration` varchar(100) NOT NULL,
	`skills` varchar(500) NOT NULL,
	`company_id` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `JobRequest` (
	`request_id` int NOT NULL AUTO_INCREMENT,
	`job_id` bigint NOT NULL,
	`candidate_id` varchar(50) NOT NULL,
	`status` varchar(255) NOT NULL,
	PRIMARY KEY (`request_id`)
);

ALTER TABLE `Experience` ADD CONSTRAINT `Experience_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;

ALTER TABLE `Education` ADD CONSTRAINT `Education_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;

ALTER TABLE `Job_Post` ADD CONSTRAINT `Job_Post_fk0` FOREIGN KEY (`company_id`) REFERENCES `Company`(`company_id`) ON DELETE CASCADE;

ALTER TABLE `JobRequest` ADD CONSTRAINT `JobRequest_fk0` FOREIGN KEY (`job_id`) REFERENCES `Job_Post`(`id`) ON DELETE CASCADE;

ALTER TABLE `JobRequest` ADD CONSTRAINT `JobRequest_fk1` FOREIGN KEY (`candidate_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;

create view ExperienceUserView as select us.first_name,us.last_name,vr.vr_id from Users as us inner join Experience as ex on ex.user_id=us.user_id inner join Validation_Requests as vr on vr.swarm_id=ex.swarm_id;

create view EducationUserView as select us.first_name,us.last_name,vr.vr_id from Users as us inner join Education as ex on ex.user_id=us.user_id inner join Validation_Requests as vr on vr.swarm_id=ex.swarm_id;
 

