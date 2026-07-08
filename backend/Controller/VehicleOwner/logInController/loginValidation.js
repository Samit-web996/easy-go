const joi = require('joi');

const customerSchema = joi.object({
   email_id :joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).min(5).lowercase().required(),
   password :joi.string().required()
});

const validateSchema = (req,res,next) =>{
    const {error} = customerSchema.validate(req.body)
    if(error){
        const msg = error.details[0].message;
        return res.status(400).json({
            success: false, 
            message: msg
        });
    }
    next()
};

module.exports = validateSchema;