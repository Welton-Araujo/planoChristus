/**
 * @OPERATIONS
 * @MONETARY
*/

/**
 * @Info Formata o preço: 49.90 => 4990
 * @param {*} price string
 * @returns Interger 4990 
 */
const toCents = (price)=>{
    return parseInt(price.toString().replace('.','').replace(',',''))
}


module.exports = {

    toCents,

}