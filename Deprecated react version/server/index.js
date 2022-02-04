const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ path: './config.env' });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet.hidePoweredBy());
app.use(cookieParser());
app.use(express.json());
app.use(require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
