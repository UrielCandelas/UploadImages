import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN ?? "http://localhost:5173"
}))



app.listen(port,()=>{
    console.log("Server running on port " + port)
})