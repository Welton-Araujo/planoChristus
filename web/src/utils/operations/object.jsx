/**
 * @OPRATIONS 
 * @OBJECT
 * 
 */

import { isPrimitive } from '../validation'


/**
 * @Info Transformar um Object multi-nivel em um Object flat.
 * @param {*} obj 
 * @param {*} rootLabel True,  permite key com nome composto: { pai.filho:"" }
 *                        False, permite key com nome simples:  { filho:"" } 
 * @param {*} carac Caractere da uniao entre a key pai e filho
 * @param {*} ignore Uma lista_com_keys que serão ignoradas no object_result.
 * @returns 
 */
export const flattenObj = (obj={}, rootLabel=true, char='.', ignore=[]) => {
     
    let rootLabelResult = {}
    let result = {}

    for (const key1 in obj) {
        //IGNORAR ITEM PRESENTE NO ARRAY: ignore 
        if(ignore.includes(key1)){ continue }
        
        // SER FOR DADO PRIMITIVO: STRING, NUMBER...
        if( isPrimitive(obj[key1])) {
            rootLabelResult[key1] = obj[key1]
            result[key1] = obj[key1]

        }else if ( typeof(obj[key1])==='object' ) {
            //CHAMADA RECURSIVA PARA: {} ou []
            const temp = flattenObj(obj[key1])

            for (const key2 in temp) { 
                //IGNORAR ITEM PRESENTE NO ARRAY: ignore 
                if(ignore.includes(`${key1}${char}${key2}`)){ continue }

                rootLabelResult[`${key1}${char}${key2}`] = temp[key2]
                result[key2] = temp[key2]
            }
        }
    }
    return rootLabel ? rootLabelResult : result
}