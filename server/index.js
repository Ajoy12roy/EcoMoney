const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoute = require('./routes/authRoute.js')



dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDB();

app.use(cors({credentials: true, }));
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
