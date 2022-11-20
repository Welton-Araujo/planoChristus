/**
 * @OPRATIONS 
 * @OBJECT
 * 
 */


/**
 * @Info Declare a flatten function that takes
 *       object as parameter and returns the
 *       flatten object 
 * @param {*} ob 
 * @param {*} doubleLabel True,  permite key com nome composto: { pai.filho:"" }
 *                        False, permite key com nome simples:  { filho:"" } 
 * @param {*} carac Caractere da uniao entre a key pai e filho
 * @returns 
 */
export const flattenObj = (ob={}, doubleLabel=true, carac='.') => {
     
    let doubleLabelResult = {}
    let singleLabelResult = {}
 
    for (const i in ob) { 
        // Verificamos o tipo do i usando
        // função typeof() e recursivamente
        // chama a função novamente
        if ( typeof(ob[i])==='object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i])
            for (const j in temp) { 
                // Store temp in result
                doubleLabelResult[i + carac + j] = temp[j]
                singleLabelResult[j] = temp[j]
            }
        }else {
            doubleLabelResult[i] = ob[i]
            singleLabelResult[i] = ob[i]
        }
    }
    return doubleLabel ? doubleLabelResult : singleLabelResult
}