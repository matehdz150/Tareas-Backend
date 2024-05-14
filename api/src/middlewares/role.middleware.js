const ResponseStatus = require('../utils/response-status');


function hasRole(role){
    return (req,res,next)=>{
        if(role === 'admin' || role === 'Admin'){
            console.log('es admin we');
            next();
        }else if(role === 'Owner' || role === 'owner'){
            console.log('es Owner we');
            next();
        }
        else{
            res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
        }
    }
}

module.exports = hasRole;