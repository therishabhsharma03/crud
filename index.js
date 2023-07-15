import { name } from "ejs";
import express from "express"
import path from "path"
import mongoose from "mongoose";

const app = express();
const users=[]

// connecting database 
mongoose.connect("mongodb://127.0.0.1:27017",{
   dbName:"backend",

})
.then(()=>console.log("Database connected"))
.catch((e)=>console.log(e))

const messageSchema = new mongoose.Schema({
   name:String,
   email:String,
});

const Messge = mongoose.model("Message",messageSchema)

// middlewares ************************************
app.use(express.static(path.join(path.resolve(),"public"))); // absolute address of our static folder 
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");  // after writing this line we dont have to specify extention of index.ejs instead we can write index only




app.get("/",(req,res)=>{
   
   res.render("index" ,{name:"Rishabh"}) 
   // res.sendFile("index.html") this code is for running static file from public

// const pathlocation= path.resolve();
// res.sendFile(path.join(pathlocation,"./index.html"))

})
app.post("/contact", async (req,res)=>{
   // console.log(req.body);   //to get complete data of form inside our body
   // console.log(req.body.name);
   // console.log(req.body.email);
   const {name , email} = req.body;
  
   await Messge.create({name, email});
   res.redirect("/success");
   
})
app.get("/success",(req,res)=>{
   
   res.render("success" ) 
 

})




app.get("/users",(req,res)=>{
res.json({
   users,
})
})


app.listen(5000,()=>{
   console.log("Server is working")
})