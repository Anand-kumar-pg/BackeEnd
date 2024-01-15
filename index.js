const app = require("./app")
const userRoutes = require("./routes/userRoutes")
const dotenv = require("dotenv");

dotenv.config({path:"./config/config.env"})
app.use("/api/user/",userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("server running");
})