import "dotenv/config"
import "./database/connectdb.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import linkRouter from "./routes/link.route.js"
import redirectRouter from "./routes/redirect.route.js"


const PORT = process.env.PORT || 5000
const app = express()
const whiteList = [process.env.ORIGIN1]

app.use(cors({
    origin: function(origin, callback){
        if(!origin && process.env.MODO === 'developer'){
            return callback(null, true);
        }
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de CORS origin: " + origin + " no autorizado.")
    },
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use(express.json())
app.use(cookieParser())
app.use('/', redirectRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/links", linkRouter)

//app.use(express.static("public"))

app.listen (PORT, () => console.log("🍕🍕🍕🍕 http://localhost:" + PORT))