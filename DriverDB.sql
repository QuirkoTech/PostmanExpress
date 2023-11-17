DROP DATABASE IF EXISTS postman_express_driver;

CREATE DATABASE postman_express_driver;


-- DROP TABLES


DROP TABLE IF EXISTS driver_parcels;

DROP TABLE IF EXISTS drivers;


-- DROP TYPES


DROP TYPE IF EXISTS LOCATION;

DROP EXTENSION IF EXISTS "uuid-ossp";


-- CREATE TYPES


CREATE TYPE LOCATION AS ENUM (
  'warehouse', -- central warehouse maybe like 100 cabinets?
  'oulu', -- 15 cabinets
  'helsinki', -- 15 cabinets
  'turku', -- 15 cabinets
  'tampere', -- 15 cabinets
  'espoo' -- 15 cabinets
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- CREATE TABLES


CREATE TABLE drivers (
  driver_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  driver_name varchar(255) NOT NULL,
  driver_email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  refresh_token varchar(255),
  driver_location LOCATION NOT NULL
);

CREATE TABLE driver_parcels (
  id SERIAL PRIMARY KEY,
  driver_id UUID REFERENCES drivers(driver_id),
  parcel_id UUID UNIQUE NOT NULL,
  delivered BOOLEAN DEFAULT FALSE
);


-- TEST DATA  


INSERT INTO drivers (driver_name, driver_email, password, driver_location) VALUES ('test', 'drivertest@gmail.com', 'test', 'helsinki');