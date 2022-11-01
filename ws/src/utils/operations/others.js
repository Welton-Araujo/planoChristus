/**
 * @OPERATIONS
 * @OTHERS
*/


/**
 * @Info    Divide um Array em varios array baseado no value.
 * @param {*} array []
 * @param {*} value String
 * @returns [[values],...]
 */
const splitArrayByValue = (array, value='') =>{
    let newArr = [[]]
    array.forEach((item) => {
        //ADD VALOR ENCONTRADO:
        if(item !== value){
            newArr[newArr.length -1].push(item)
        }else{//CRIAR NOVO SUBARRAY:
            newArr.push([])
        }
    })
    return newArr
}


module.exports = {
    
    splitArrayByValue,

}