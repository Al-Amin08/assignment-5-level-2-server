import express, { Request, Response } from "express" 
import cors from "cors"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { router } from "./app/route"
import expressSession from "express-session"
import passport from "passport"
import cookieParser from "cookie-parser"
import "./app/config/passport"


const app = express()


app.use(expressSession({
    secret: "Your secret",
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))


app.use("/api",router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message:"Welcome to Wallet Management System"
    })
})


app.use(globalErrorHandler)

export default app