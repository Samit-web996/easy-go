const joi = require('joi');

const customerSchema = joi.object({
   username : joi.string().min(5).lowercase().pattern(/^[a-z0-9@#$%!]\S+$/).required(),
   password :joi.string().required()
});

const validateSchema = (req,res,next) =>{
    const {error} = customerSchema.validate(req.body)
    if(error){
        return res.send({message :"InValid Credential"})
    }
    next()
};

module.exports = validateSchema;
