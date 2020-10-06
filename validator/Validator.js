const autoBind=require('auto-bind');

class Valdator{
    constructor(){
         autoBind(this)
    }
}

module.exports=Valdator;