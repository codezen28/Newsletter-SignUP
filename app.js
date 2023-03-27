const express=require("express");
const request=require("request");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
const { urlencoded } = require("body-parser");

app.use(express.static("public"));          // This is used to access the static files such as images and css
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
const FirstName=req.body.fname;
const LastName=req.body.lname;
const email=req.body.email;

console.log(FirstName, LastName, email);


const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:FirstName,
                LNAME:LastName
            }
        }
    ]
};
 
const jsonData=JSON.stringify(data);
const url="https://us13.api.mailchimp.com/3.0/lists/5a60e8c5a8";
const options={
    method:"POST",
    auth:"vaibhav28:e1c9a321d9c541959813999371cc9dfd-us13"
}
const request=https.request(url,options,function(response){
    if(response.statusCode===200)
    res.sendFile(__dirname+"/success.html");
    else
    res.sendFile(__dirname+"/failure.html");

response.on("data",function(data){
    console.log(JSON.parse(data));
})

})
//request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");                       // when it is failed to sign up then it will redirect to home page
});





app.listen(process.env.PORT || 3000,function(){                             //This is a dynamic port
    console.log("Port is started");
});

// API KEY
// e1c9a321d9c541959813999371cc9dfd-us13

//Audience Id
//5a60e8c5a8