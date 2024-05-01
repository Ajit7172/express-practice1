# express-practice1
 npm init -y
 npm i express --save
 create .gitignore file > Add node_modules folder
 create index.js file
 update the script as "dev": "node index.js" in the package.json
 in index.js,
   const express = require('express');
   const app =express();
 
   app.get("/",(req,res)=>{
   res.json({msg: "hello world"})
   })
 
   app.listen(8000, ()=>{
   console.log("App is running")
   })
 
 npm i --save-dev nodemon
 
 In package.json, scripts:{
   "dev": "nodemon index.js",
   "start": "node index.js"
   }
 
 npm run dev
 
 npm i --save dotenv
 
 in index.js, require("dotenv").config()
 
 create .env file
 
 Add PORT=8000 in .env file
 
 In index.js, replace
    const PORT=8000 => const PORT=Number(process.env.PORT)
 
 Add .env file in gitignore file