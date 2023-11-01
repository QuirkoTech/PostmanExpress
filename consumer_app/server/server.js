import './config.js';

import app from './app.js';

app.listen(process.env.API_PROCESS_PORT, console.log(`App is listening on port ${process.env.API_PROCESS_PORT}...`));
