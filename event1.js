var express = require("express"); // Requires the Express module just as you require other modules and and puts it in a variable.
var mysql = require("mysql");//using the mysql module. 
var path = require("path"); //Extract the filename from a file path:
var nodemailer = require('nodemailer');


 //***********************************************************/
 
   /* var transporter = nodemailer.createTransport({
       
      service: 'gmail',
      auth: {
        user: 'ashimajindal169@gmail.com',
        pass: 'SMART@66'
      }
    });
    
    var mailOptions = {
      from: 'ashimajindal169@gmail.com',
      to: 'ashimajindal169@gmail.com',
     // to:req.body.email,
     
      subject: 'Welcome to function orgnaziation',
      /*text: req.body.email & req.body.password*/

      /*text: `Dear User

      Thank you for completing your registration with Event Planners. 
      
      This email serves as a confirmation that your account is activated and that you are officially a part of the Event Planners family.
      Enjoy!
      
      Regards,
      The team`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        
      }
    });
    */
  
 

var app = express(); //Calls the express function "express()" and puts new Express application inside the app variable
app.use(express.static("project"));//tells server to pick .css and .js files from public folder
app.listen(8006,function(){
    console.log("------------------Server Started-----------")
})

app.use(express.urlencoded({extended:true}));//to convert Binary to JSON Object

var fileup=require("express-fileupload");
app.use(fileup());


app.use(express.urlencoded({extended:true}));

var dbConfig={ // connecting to my sql
    host:"localhost",
    user:"root",
    password:"",
    database:"users"
}
var dbcon=mysql.createConnection(dbConfig); //gives mysql info through which we r connecting
dbcon.connect(function(err){ // connected to my sql
  if(err)
      console.log(err.message);
  else
  console.log("-----------Connected Sucessfully-------------");    
})
app.get("/", function (req, resp) {
    resp.send("Welcome Users..");
  
  })
  app.get("/index",(reqKuch, respKuch) => {
    var filePath =path.join(__dirname,"project", "index.html");
   
    
    })
    app.get("/home",(req,resp)=>{
    var filePath=path.join(path.resolve(),"project","dash-admin.html");
      resp.sendFile(filePath);
    
    })
    app.get("/dashclient",(reqKuch, respKuch) => {
      var filePath =path.join(__dirname,"project", "dash-client.html");
      respKuch.sendFile(filePath);
        console.log(filePath);
      
      })
      app.get("/dashvendor",(reqKuch, respKuch) => {
        var filePath =path.join(__dirname,"project", "dash-vendor.html");
        respKuch.sendFile(filePath);
          console.log(filePath);
        
        })
      app.get("/vendor",(reqKuch, respKuch) => {
        var filePath =path.join(__dirname,"project", "profile-vendor.html");
        respKuch.sendFile(filePath);
          console.log(filePath);
        
        })
        app.get("/profile",(reqKuch, respKuch) => {
          var filePath =path.join(__dirname,"project", "profile-client.html");
          respKuch.sendFile(filePath);
            console.log(filePath);
          
          })
    
     
  app.post("/index-signup",(req,resp)=>{
    var curd = new Date();
    var dos=curd.getFullYear()+"-"+(curd.getMonth()+1)+"-"+curd.getDate();
    req.body.dos=dos;

    var data=[req.body.email, req.body.pwd, req.body.type,req.body.dos];
    console.log(data);
     dbcon.query("insert into signup values(?,?,?,current_date())",data,function(err)
     {
         if(err)
             resp.send(err.message);
             else
             resp.redirect("/index.html");
     })
    


    })
  
   
 
    //--------------------------------------------------------------------
    app.get("/chk-user-in-table-signup",function(req,resp){
        //resp.send("Bale Bale of "+ req.query.thisuser);
     
       // dbcon.query("select * from signup where email=?",[req.query.thisuser],function(err,result){
          dbcon.query("select * from signup where email=? and pwd=?",[req.query.thisuser,req.query.thispwd],function(err,result){
            if(err)
            resp.send(err.message);
            else
            resp.send(result);
            //console.log(result);
        })
      })
      //vendor************************************************************
    
app.post("/vendor-save",(req,resp)=>{

  if(req.files==null)
  req.body.picname="disc.png";
else
  {
        req.body.picname=req.files.proofpath.name;
       var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.proofpath.name);
       //console.log(uploadsFolder);

       //resp.send("File Received:"+req.files.ppic.name);
           req.files.proofpath.mv(uploadsFolder);
           //resp.send("Pic saved");
  }
        var data=[req.body.email, req.body.name, req.body.contact, req.body.firm, req.body.estd, req.body.address, req.body.city, req.body.acard, req.files.proofpath.name, req.body.selservices, req.body.otherinfo];
        console.log(data);
         dbcon.query("insert into vendor values(?,?,?,?,?,?,?,?,?,?,?)",data,function(err)
         {
             if(err)
                 resp.send(err.message);
                 else
                 resp.send("Record Saved");
         })
      

})
app.post("/info-save",(req,resp)=>{

  
        var data=[req.body.fname, req.body.lname, req.body.email, req.body.comment];
        console.log(data);
         dbcon.query("insert into info values(?,?,?,?)",data,function(err)
         {
             if(err)
                 resp.send(err.message);
                 else
                 resp.send("Record Saved");
         })
      

})

//--------------------------------------------------------
app.get("/chk-user-in-table",function(req,resp){
//resp.send("Bale Bale of "+ req.query.thisuser);

dbcon.query("select * from vendor where email=?",[req.query.thisuser],function(err,result){
    if(err)
    resp.send(err.message);
    else
    resp.send(result);
})
})
app.get("/plan",(reqKuch, respKuch) => {
  var filePath =path.join(__dirname,"project", "plan-function.html");
  respKuch.sendFile(filePath);
    console.log(filePath);
  
  })

app.post("/vendor-update", (req, resp) => {

  var filename="";
  if(req.files==null)
  {
      console.log("***************"+req.body.jasoos);
      filename=req.body.jasoos;
  }
  else{
        req.body.picname=req.files.proofpath.name;
       var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.proofpath.name);
              req.files.proofpath.mv(uploadsFolder);

              filename=req.files.proofpath.name;
  }
    
 var data=[ req.body.name, req.body.contact, req.body.firm, req.body.estd, req.body.address, req.body.city, req.body.acard, req.body.selservices, req.body.otherinfo,filename,req.body.email];
  dbcon.query("update vendor set name=?, contact=?, firm=?, estd=?, address=?, city=?, acard=?, selservices=?, otherinfo=?, proofpath=? where email=? ",data,function(err){
       if(err)
       resp.send(err);
       else
       resp.send("Your Data is Successfully Updated!.");
  })
  
  })
  
  app.get("/fetch-data-vendor",function(req,resp){
    dbcon.query("select * from vendor",function(err,result)
    {
      if(err)
       resp.send(err);
       else
       resp.send(result);
  })

    })

  app.get("/data-del",function(req,resp)
  {
    var data=[req.query.emailx];
    dbcon.query("delete from vendor where email=?",data,function(err,res)
    {
      if(err)
      
       resp.send(err.message);
       else
      
       resp.send(res.affectedRows+"Record Deleted");
  })

    })

    
    app.get("/loadcity", function(req, resp) {
      dbcon.query("select distinct city from vendor", function(err, result)
      {
        if(err)
         resp.send(err);
         else
         resp.send(result);
    })

      })
      app.get("/loadservices", function(req,resp){
        dbcon.query("select selservices from vendor ",function(err, result)
        {
          if(err)
           resp.send(err);
           else
           resp.send(result);
      })
  
        })
        app.get("/doFetchData", function (req, resp) {
          console.log(req.query.thiscity);
          console.log(req.query.thisservices);
         dbcon.query("select * from vendor where city=? and selservices like ?", [req.query.thiscity,"%"+req.query.thisservices+"%"], function (err, result) {
         
              if (err)
                  resp.send(err.message);
              else
                  resp.send(result);
          })
      })

     //---------------------------client--------------------------------------- 
app.post("/profile-save",(req,resp)=>{

  if(req.files==null)
  req.body.picname="disc.png";
else
  {
        req.body.picname=req.files.picpath.name;
       var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.picpath.name);
       //console.log(uploadsFolder);

       //resp.send("File Received:"+req.files.ppic.name);
           req.files.picpath.mv(uploadsFolder);
           //resp.send("Pic saved");
  }
   
      /* var curd = new Date();
       var dos=curd.getFullYear()+"-"+(curd.getMonth()+1)+"-"+curd.getDate();
        var tos=curd.getHours()+":"+curd.getMinutes()+":"+curd.getSeconds();
        req.body.tos=tos;
        console.log(tos);
        req.body.dos=dos;*/
     
        var data=[req.body.email, req.files.picpath.name, req.body.uname, req.body.address, req.body.city, req.body.contact];
        console.log(data);
         dbcon.query("insert into client values(?,?,?,?,?,?)",data,function(err)
         {
             if(err)
                 resp.send(err.message);
                 else
                 resp.send("Record Saved");
         })
      

})


//--------------------------client------------------------------
app.get("/chk-user-in-table-profile",function(req,resp){
//resp.send("Bale Bale of "+ req.query.thisuser);

dbcon.query("select * from client where email=?",[req.query.thisuser],function(err,result){
    if(err)
    resp.send(err.message);
    else
    resp.send(result);
})
})
 
app.post("/profile-update", (req, resp) => {
 
  var filename="";
  if(req.files==null)
  {
      console.log("***************"+req.body.jasoos);
      filename=req.body.jasoos;
  }
  else{
        req.body.picname=req.files.picpath.name;
       var uploadsFolder=path.join(path.resolve(),"public","uploads",req.files.picpath.name);
              req.files.picpath.mv(uploadsFolder);

              filename=req.files.picpath.name;
  }
    
 var data=[req.body.uname, req.body.address,filename,req.body.city, req.body.contact,req.body.email];
  dbcon.query("update client set uname=?, address=?, picpath=?, city=?, contact=? where email=? ",data,function(err){
       if(err)
       resp.send(err);
       else
       resp.send("Your Data is Successfully Updated!.");
  })
  })

  app.get("/fetch-data-client",function(req,resp){
    dbcon.query("select * from client",function(err,result)
    {
      if(err)
       resp.send(err);
       else
       resp.send(result);
  })
  
    })
  
  app.get("/data-del",function(req,resp)
  {
    var data=[req.query.emailx];
    dbcon.query("delete from client where email=?",data,function(err,res)
    {
      if(err)
      
       resp.send(err.message);
       else
      
       resp.send(res.affectedRows+"Record Deleted");
  })
  
    })
    
    app.post("/changepwd", (req, resp) => {
      //if (req.body.pwd == req.body.newpwd) {
         dbcon.query("update signup set pwd=? where email=?", [req.body.pwd, req.body.email], function (err) {
           if (err)
                resp.send(err.message)
              else
                  resp.send("Record Updated")
              /*var data=[ req.body.pwd,req.body.email];
  dbcon.query("update signup set pwd=? where email=? ",data,function(err){
       if(err)
       resp.send(err);
       else
       resp.send("Your Data is Successfully Updated!.");
  })
         }
        )
  */
        })
      })
  