import { setServers } from "dns/promises"
setServers(["8.8.8.8", "8.8.4.4"])

import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"

import authRoutes from "./routes/auth.route.js"

dotenv.config()
const app=express()

const PORT=process.env.PORT

app.use(express.json())

app.use("/api/auth",authRoutes)
console.log(process.env.MONGODB_URI)
app.listen(PORT,()=>{
    console.log("Server running on port ",PORT)
    connectDB()
})