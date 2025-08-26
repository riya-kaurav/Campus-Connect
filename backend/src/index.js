import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN || "*",
        credentials : true
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/api/test" , (req , res) => {
    res.json({ message : "API is working"})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})