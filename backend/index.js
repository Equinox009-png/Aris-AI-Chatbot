import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.route.js'
import promptSchemaRoutes from './routes/prompt.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()
const app = express()
const port = process.env.PORT || 4002;
// DB Connection goes here
const MONGO_URL=process.env.MONGO_URI

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
//middleware
app.use(express.json());
mongoose.connect(MONGO_URL).then(()=>console.log("DB Connected")).catch((error)=>console.log("DB Connection Failed", error))
// routes
app.use(cookieParser());
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/prompt", promptSchemaRoutes);




app.get('/', (req, res) => {
  res.send('Jyoti ')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
