const Controllr = require('../controllers/Controllr');
const User = require('../models/RegesterModels');
const momment = require('jalali-moment');

const { body, validationResult } = require('express-validator');
const { use } = require('../Routers/dashboard');
module.exports = new class DashboardController extends Controllr {
// *******Profile *****go to panel
    async Profile(req, res, next) {
        
      if(req.session.user.active === 1){
         return res.render('panel/Profile.ejs',{valelastname: req.flash("valuelastname"),valename: req.flash("valuename"),valeemail: req.flash("valueEmail"),number:req.session.user.moblie,DonTmach:req.flash("DonTmach"),Empty:req.flash("erroEmpth")})
      }
      if(req.session.user.active === 2)
      {
          return res.send("ok")
      }
    }
    async ProfilePost(req,res,next){
       
        if(!req.body.name || !req.body.lastname || !req.body.email || !req.body.password)
        {
            req.flash("erroEmpth","لطفا فرم را با دقت بیشتری پرنماید")
            return res.redirect("/dashboard");   
        }
       
        if(req.body.password != req.body.aginpassword)
            {
                req.flash("valueEmail",req.body.email);
                req.flash("valuename",req.body.name);
                req.flash("valuelastname",req.body.lastname);
                
                req.flash("DonTmach","متاسفانه  پسورد باهم هماهنگی ندارد");
                return res.redirect("/dashboard");    
            }      
           let data ={
            name:req.body.name,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            active:2
           }
           if(req.body.exampleRadios == "karjo")
           {
               data.role = req.body.exampleRadios
           }
           if(req.body.exampleRadios == "karfarma")
           {
               data.role = req.body.exampleRadios
           }
           if(req.file)
           {
                data.img=req.file.path.replace(/\\/g,'/').substring(6);
           }
            let userappdate = await User.findOneAndUpdate({_id:req.session.user._id},{$set :data});
            let user = await User.findById({_id:req.session.user._id});

           
          if(user.role == 'karjo')
          {
              return res.redirect(`/dashboard/karjo/${user.id}`)
          }
    }

    async karjopanel(req,res,next){
        try {
            
            let userkarjo = await User.findById({_id : req.params.id});
            if(userkarjo.id != req.session.user.id){
                return  res.render('error404.ejs')
            }
            if(userkarjo.active == 2){  
            return res.render('panel/karjo.ejs',{user:userkarjo})
            }else{
              return  res.render('error404.ejs')
            }

        } catch (error) {
            
        }
    }


}