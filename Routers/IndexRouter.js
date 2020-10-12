const express = require('express');
const router = express.Router();

//Home
router.get("/", async function(req, res, next) {
        try {
            return res.render('home/index.ejs')
        } catch (error) {

        }
    })
    // Login and Regester
router.use("/user", require('./authRouter'));
// Dashboard
router.use("/dashboard", require('./dashboard'))
    // logout
    router.get('/logout',(req,res,next)=>{
        req.session.destroy()
      
       res.redirect('/')
    })
//404 page    
router.all('*',async (req,res,next)=>{
        try {
            res.render('error404.ejs',{title:req.path})
        } catch (error) {
            next();
        }
        
    });


module.exports = router;