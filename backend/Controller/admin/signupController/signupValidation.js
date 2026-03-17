const joi = require('joi');

const customerSchema = joi.object({
   username : joi.string().min(5).lowercase().pattern(/^[a-z0-9@#$%!]\S+$/).required(),
   password :joi.string().required(),
   mobile_no : joi.string().length(10).pattern(/^[6-9][0-9]{9}$/).required(),
   email_id : joi.string().lowercase().email().trim().required()
});

const validateSchema = (req,res,next) =>{
    const {error} = customerSchema.validate(req.body)
    if(error){
        return res.send("InValid Credential")
    }
    next()
};

module.exports = validateSchema;