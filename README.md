<div align="center">

# PostmanExpress

PostmanExpress is composed of three interconnected applications, designed to replicate the functionality of an automated parcel delivery locker system, much like the renowned services offered by Posti or Matkahuolto. These applications work in tandem to provide a comprehensive solution for managing deliveries and pickups of parcels. The three applications are:

</div>


### [Consumer Application](https://consumer-pe.salute-sir.com)

Here users can:

-   Sign-up
-   Create new parcels
-   See own parcels detailed information
-   Track existing parcels

### [Driver Application](https://driver-pe.salute-sir.com)

Here drivers can:

-   See parcels that are available for delivery
-   Accept a parcel to deliver
-   See accepted parcels detailed information

### [Locker Application](https://locker-pe.salute-sir.com)

Here users can:

-   Enter pin numbers to collect or deliver parcels

## Visit PostmanExpress Applications

-   [Consumer Application](https://consumer-pe.salute-sir.com)
-   [Driver Application](https://driver-pe.salute-sir.com)
-   [Locker Application](https://locker-pe.salute-sir.com) (Designed for a tablet sized screen)

## Installation

### Pre-requisites

To setup PostmanExpress [nodeJS](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) is required.

### Databases

PostmanExpress requires two databases. The database scripts can be found in following files: **"PostmanExpressDB.sql"** and **"DriverDB.sql"** both files are located in the root folder.

### Organization API

Inside the **/organization_api** directory run the following commands:

```bash
npm install
```

```bash
npm run dev-api
```

### Driver Application and Consumer Application

Locate the file **".env.example"** in the **/consumer_app** and **/driver_app** directories. Rename both files to **".env"** and replace the variables with your own environmental variables.

Inside the **/consumer_app** and **/driver_app** directories run the following commands:

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run dev-api
```

### Locker Application

Inside the **/locker_app** directory run the following commands:

```bash
npm install
```

```bash
npm run dev
```

## Contributors

-   [Iurii Gaitrov](https://github.com/RepoRover)
-   [Matheus Oliveira](https://github.com/Matheus-OAMK)
-   [Ha Dang](https://github.com/hha297)
-   [Thinh Phan](https://github.com/PhanHoangThinh)

## Tools and Technologies

### UI

-   React
-   Tailwind
-   Vitest && React Testing Library (For testing)

### Server

-   NodeJS
-   Express
-   PostgresSQL
-   Supertest && Chai (For testing)
