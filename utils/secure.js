const {checkRole, verifyToken} = require("./token");

const secure = (sysRole) => {
    return (req, res, next) => {
        try{
        const {access_token} = req.headers;
        // what to do if no token
        if (!access_token) throw new Error("Token is misssing");
        // check the token is valid or not
        const isValid = verifyToken(token);
        //  token expired??
        if (!isValid) throw new Error("Token expired");
        const {data} = isValid;
        // RBAC: ROle Base Access Control
        const validRole = checkRole({sysRole, userRole: data?.roles || [] });
        if(!validRole) throw new Error("User unauthorized");
        next();    
        } catch(e){
            next(e);
        }
    };
};

module.exports = {secure};