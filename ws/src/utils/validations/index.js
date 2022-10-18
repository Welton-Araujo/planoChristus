/**
 * @VALIDATION
*/


/********************************
 * @BOOL
*/

/**
 * @Info Verificar se array ou object estão preenchidos com pelo menos um item. 
 *       Suporta valor UNDEFINED ou NULL sem gerar erros.
 * @param {*} obj Array ou Object
 * @returns bool
 */
const isFilled = (obj) => {
    if( obj==null || obj==undefined ) return false    
    return (Object.keys(obj).length > 0)
}

/**
 * @Info Verificar se array ou object são vazios. 
 *       Suporta valor UNDEFINED ou NULL sem gerar erros.
 * @param {*} obj Array ou Object
 * @returns bool
 */
const isEmpty = (obj) => {
    return !isFilled(obj)
}


module.exports = {

    isFilled,
    isEmpty,

}