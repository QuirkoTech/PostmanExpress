
DROP DATABASE IF EXISTS postman_express_db;

CREATE DATABASE postman_express_db;


DROP TABLE IF EXISTS driver_parcels;


DROP TABLE IF EXISTS drivers;


DROP TABLE IF EXISTS user_parcels;

DROP TABLE IF EXISTS cabinets;

DROP TABLE IF EXISTS parcels;

DROP TABLE IF EXISTS users;




DROP TYPE IF EXISTS PARCELSTATUS;

DROP TYPE IF EXISTS CABINETSTATUS;

DROP TYPE IF EXISTS LOCATION;

DROP EXTENSION IF EXISTS "uuid-ossp";


CREATE TYPE LOCATION AS ENUM (
  'warehouse', -- central warehouse maybe like 100 cabinets?
  'oulu', -- 15 cabinets
  'helsinki', -- 15 cabinets
  'turku', -- 15 cabinets
  'tampere', -- 15 cabinets
  'espoo' -- 15 cabinets
);

CREATE TYPE CABINETSTATUS AS ENUM (
  'empty', -- Nothing inside
  'reserved', -- Waiting from a parcel from customer or driver
  'occupied' -- A parcel is inside ready for pickup from driver or customer
);


CREATE TYPE PARCELSTATUS AS ENUM (
  'awaiting drop-off', -- After creating a new parcel & timestamp also used for when order is created
  'prepared for delivery', -- Inside a cabinet, waiting for a driver
  'en route to the warehouse', -- Driver accepted delivery, not yet in the final destination
  'at warehouse', -- Parcel is at warehouse waiting for a driver to accept
  'en route to the pickup location', -- Parcel is accepted and on the way to the final destination
  'ready for pickup', -- In the final destination cabinet, waiting for the customer
  'delivered' -- Customer picked up the parcel from the cabinet
);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- **************************************************************************** POSTMAN EXPRESS DB  ****************************************************************************

CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_name varchar(255) NOT NULL,
  user_email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  refresh_token varchar(255),
  user_location LOCATION NOT NULL
);



CREATE TABLE parcels (
  parcel_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parcel_status PARCELSTATUS NOT NULL,
  parcel_sender_id UUID REFERENCES users(user_id),
  parcel_receiver_email varchar(255),
  height integer NOT NULL,
  length integer NOT NULL,
  width integer NOT NULL,
  weight integer NOT NULL,
  pickup_pin integer UNIQUE,
  delivery_pin integer UNIQUE,
  notify BOOLEAN DEFAULT TRUE,
  status_timestamps jsonb[]
);





CREATE TABLE cabinets (
  cabinet_id SERIAL PRIMARY KEY,
  cabinet_status CABINETSTATUS NOT NULL,
  cabinet_location LOCATION NOT NULL,
  parcel_id UUID REFERENCES parcels(parcel_id)
);

-- CREATE TABLE user_parcels (
--   id SERIAL PRIMARY KEY,
--   parcel_id UUID REFERENCES parcels(parcel_id),
--   notify BOOLEAN DEFAULT TRUE
-- );


-- **************************************************************************** DRIVER DB  ****************************************************************************

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



-- **************************************************************************** TEST DATA  ****************************************************************************
INSERT INTO users (user_name, user_email, password, user_location) VALUES ('test', 'usertest@gmail.com', 'test', 'oulu');

INSERT INTO drivers (driver_name, driver_email, password, driver_location) VALUES ('test', 'drivertest@gmail.com', 'test', 'helsinki');


INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps)
VALUES (
  'awaiting drop-off',
  (SELECT user_id FROM users WHERE user_name = 'test'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  11111,
  22222,
  ARRAY[
  jsonb_build_object('status', 'awaiting drop-off', 'date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI') )
  ]
);




-- **************************************************************************** TEST QUERIES ****************************************************************************


-- ************* Here you can see how to add a new status to the status_timestamps array *************

CREATE TABLE test (
  id SERIAL PRIMARY KEY,
  status varchar(255),
  status_timestamps jsonb[]
);

DROP TABLE IF EXISTS test;


INSERT INTO test (status_timestamps, status)
VALUES (ARRAY[
  jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'awaiting drop-off')
], 'awaiting drop-off');

UPDATE test
SET status_timestamps = status_timestamps || jsonb_build_object('date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI'), 'status', 'prepared for delivery'),
status = 'prepared for delivery'
WHERE id = 5;


SELECT status_timestamps FROM test;






-- SELECT * FROM parcels WHERE parcel_id = ANY($1);
