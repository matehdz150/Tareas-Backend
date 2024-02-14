const ResponseStatus = require('../utils/response-status');

const authUser = {
    id: 1,
    role: 'admin',
    name: 'John dean'
}

module.exports= (req, res, next)=>{
    if(req.query.token && req.query.token === '123'){
        req.user = {...authUser}
        next();
    }else{
        res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
    }
}