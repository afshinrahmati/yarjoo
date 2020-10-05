const Controllr=require('../controllers/Controllr');

module.exports=new class DashboardController extends Controllr
{
async RegesterGet(req,res,next){
    try {
       return res.render('auth/Regester.ejs')
    } catch (error) {
        
    }
}
}
