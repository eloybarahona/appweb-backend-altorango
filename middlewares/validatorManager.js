import axios from "axios"
import { validationResult, body, param } from "express-validator"

export const validationResultExpress = (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const bodyRegisterValidator =  [
    body('email', 'Formato de email incorrecto.')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 caracteres.")
        .trim()
        .isLength( { min:6 } ),
    body("password", "Formato de password incorrecto.")
        .custom((value, {req}) => { 
            if(value !== req.body.repassword) { 
                throw new Error('No coinciden las contraseñas.') 
            } 
            return value
        }),
    validationResultExpress
]

export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto.')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 caracteres.")
        .trim()
        .isLength( { min:6 } ),
    validationResultExpress
]
    
export const bodyLinkValidator = [
    body('longLink', 'Formato de link incorrecto.')
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                //console.log("Link: " + value)
                if(!value.startsWith('https://')){
                    value = 'https://' + value
                };
                await axios.get(value);
                return value
            } catch (error) {
                console.log(error)
                throw new Error('Enlace longLink no encontrado.')
            }
        }),
    validationResultExpress
]

export const paramsLinkValidator = [
    param("id", "Formato no valida del parametro.")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress
]