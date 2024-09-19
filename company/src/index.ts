import dotenv from 'dotenv'
dotenv.config();
import './config/mongo'
import app from './app';

const PORT:string = process.env.PORT || "5000";

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
