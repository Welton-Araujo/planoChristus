/**
 * @SECURE_REQUEST
*/


/**
 * @Info Este metodo remove campo passwd (DO RESPONSE) vindo requisiçao: req.query:{fields, ....}
 * @param {*} fields String para consulta noSQL: .select(fields)
 * @returns String Nova string sem o passwd.
*/
const noPasswd = (fields='') => {
    const fieldsNoPasswd = fields.replaceAll('passwd','')
    return fieldsNoPasswd
}


module.exports = {

    noPasswd,

}