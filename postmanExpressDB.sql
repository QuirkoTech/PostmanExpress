DROP DATABASE IF EXISTS postman_express_db;

CREATE DATABASE postman_express_db;


-- DROP TABLES


DROP TABLE IF EXISTS cabinets;

DROP TABLE IF EXISTS parcels;

DROP TABLE IF EXISTS users;


-- DROP TYPES


DROP TYPE IF EXISTS PARCELSTATUS;

DROP TYPE IF EXISTS CABINETSTATUS;

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


-- CREATE TABLES


CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_name varchar(255),
  user_email varchar(255) UNIQUE,
  password varchar(255),
  refresh_token varchar(255),
  user_location LOCATION 
);

CREATE TABLE parcels (
  parcel_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parcel_status PARCELSTATUS NOT NULL,
  parcel_sender_id UUID REFERENCES users(user_id),
  parcel_receiver_email varchar(255),
  parcel_name varchar(255) NOT NULL,
  ship_to LOCATION NOT NULL,
  current_location LOCATION,
  ship_from LOCATION NOT NULL,
  height integer NOT NULL,
  length integer NOT NULL,
  width integer NOT NULL,
  weight integer NOT NULL,
  pickup_pin integer UNIQUE,
  delivery_pin integer UNIQUE,
  driver_accepted BOOLEAN DEFAULT FALSE,
  notify BOOLEAN DEFAULT TRUE,
  status_timestamps jsonb[]
);

CREATE TABLE cabinets (
  cabinet_id SERIAL PRIMARY KEY,
  cabinet_status CABINETSTATUS NOT NULL,
  cabinet_location LOCATION NOT NULL,
  parcel_id UUID REFERENCES parcels(parcel_id)
);


-- TEST DATA

INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'oulu', 'empty' FROM generate_series(1, 15);
INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'espoo', 'empty' FROM generate_series(1, 15);
INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'turku', 'empty' FROM generate_series(1, 15);
INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'tampere', 'empty' FROM generate_series(1, 15);
INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'helsinki', 'empty' FROM generate_series(1, 15);
INSERT INTO cabinets (cabinet_location, cabinet_status) SELECT 'warehouse', 'empty' FROM generate_series(1, 100);

-- Need to create user manually due to pw encryption
INSERT INTO users (user_name, user_email, password, user_location) VALUES ('test', 'usertest@gmail.com', 'test', 'oulu');

INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps,ship_to, ship_from,notify, parcel_name)
VALUES (
  'delivered',
  (SELECT user_id FROM users WHERE user_email = 'usertest@gmail.com'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  11111,
  22222,
  ARRAY[
  jsonb_build_object('status', 'delivered', 'date', TO_CHAR( now(), 'DD.MM.YY'), 'time', TO_CHAR(now(), 'HH24:MI') )
  ],
  'helsinki',
  'oulu',
  true,
  'Nike shoes'
);

INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps, ship_to, ship_from, notify, parcel_name)
VALUES (
  'delivered',
  (SELECT user_id FROM users WHERE user_email = 'usertest@gmail.com'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  22222,
  33333,
  ARRAY[
    jsonb_build_object('status', 'delivered', 'date', TO_CHAR( now() - interval '1 day', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '1 day', 'HH24:MI') )
  ],
  'turku',
  'oulu',
  true,
  'Adidas jacket'
);

INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps, ship_to, ship_from, notify, parcel_name)
VALUES (
  'delivered',
  (SELECT user_id FROM users WHERE user_email = 'usertest@gmail.com'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  33333,
  44444,
  ARRAY[
    jsonb_build_object('status', 'delivered', 'date', TO_CHAR( now() - interval '2 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '2 days', 'HH24:MI') )
  ],
  'turku',
  'oulu',
  true,
  'Shiny cup'
);

INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps, ship_to, ship_from, notify, parcel_name)
VALUES (
  'delivered',
  (SELECT user_id FROM users WHERE user_email = 'usertest@gmail.com'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  44444,
  55555,
  ARRAY[
    jsonb_build_object('status', 'delivered', 'date', TO_CHAR( now() - interval '3 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '3 days', 'HH24:MI') )
  ],
  'espoo',
  'helsinki',
  true,
  'Book collection'
);


INSERT INTO parcels (parcel_status, parcel_sender_id, parcel_receiver_email, height, length, width, weight, pickup_pin, delivery_pin, status_timestamps, ship_to, ship_from, notify, parcel_name)
VALUES (
  'delivered',
  (SELECT user_id FROM users WHERE user_email = 'usertest@gmail.com'),
  'test@gmail.com',
  13,
  16,
  31,
  21,
  55555,
  66666,
  ARRAY[
    jsonb_build_object('status', 'delivered', 'date', TO_CHAR( now() - interval '4 days', 'DD.MM.YY'), 'time', TO_CHAR(now() - interval '4 days', 'HH24:MI') )
  ],
  'tampere',
  'helsinki',
  true,
  'Tech gadgets'
);

DELETE FROM parcels;




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


-- SOME QUERIES


-- SELECT * FROM parcels WHERE parcel_id = ANY($1);