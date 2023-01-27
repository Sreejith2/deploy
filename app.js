const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items =["Wake Up","Brush","Study"];
var workItems=[];

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",function(req,res){
    let toDay = new Date();
    let options ={
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    let day = toDay.toLocaleDateString("en-US",options);
    res.render('index',{listTitle : day,newItems:items,list_name:"day_list"});
});

app.post("/",function(req,res){
    let it = req.body.item;
    if(req.body.list==="day_list"){
        items.push(it);
        res.redirect("/");
    }else{
        workItems.push(it);
        res.redirect("/work");
    }
});

app.get("/work",function(req,res){
    res.render("index",{listTitle:"Work List",newItems:workItems,list_name:"work_list"})
});

app.listen(3000,function(){
    console.log("Server started running at the port 3000");
});
