import { handler } from './build/handler.js';
import express from 'express';
import * as api_path from './src/lib/server/path.js';

const host = 'HOST' in process.env ? process.env['HOST'] : '0.0.0.0';
const port = 'PORT' in process.env ? process.env['PORT'] : '3000';

const app = express();

// Serve your folder
app.use('/video', express.static(api_path.video))

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(port,host,  () => {
    console.log('listening on port 3000');
});


