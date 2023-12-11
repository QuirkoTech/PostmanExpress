-- Active: 1699102512752@@127.0.0.1@5432@postman_express_db
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
  'espoo', -- 15 cabinets
  'Deleted'
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
  user_name varchar(255) NOT NULL,
  user_email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  refresh_token varchar(255),
  user_location LOCATION NOT NULL
);

-- Creating a partial unique index to exclude 'deleted_user@example.com'
CREATE UNIQUE INDEX idx_unique_email_except_deleted
ON users (user_email)
WHERE user_email != 'Deleted';

CREATE TABLE parcels (
  parcel_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parcel_status PARCELSTATUS NOT NULL,
  parcel_sender_id UUID REFERENCES users(user_id),
  parcel_receiver_email varchar(255),
  parcel_name varchar(255) NOT NULL,
  ship_to LOCATION NOT NULL,
  current_location LOCATION,
  ship_from LOCATION NOT NULL,
  height numeric(10,1) NOT NULL,
  length numeric(10,1) NOT NULL,
  width numeric(10,1) NOT NULL,
  weight numeric(10,1) NOT NULL,
  pickup_pin integer UNIQUE,
  delivery_pin integer UNIQUE,
  driver_accepted BOOLEAN DEFAULT FALSE,
  notify BOOLEAN DEFAULT FALSE,
  status_timestamps jsonb[]
);

CREATE TABLE cabinets (
  cabinet_id SERIAL PRIMARY KEY,
  cabinet_status CABINETSTATUS NOT NULL,
  cabinet_location LOCATION NOT NULL,
  parcel_id UUID REFERENCES parcels(parcel_id)
);

