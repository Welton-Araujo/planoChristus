/**
 * @CALCULATE_DISTANCE
*/

const turf  = require('@turf/turf')//lib de geo localizacao

/**
 * @Info Retorna a distancia entre duas geo-coordenadas validas.
 * @param {*} coordinates1 
 * @param {*} coordinates2 
 * @returns number 00.0000
 */
const distance = (coordinates1=[0.0, 0.0], coordinates2=[0.0, 0.0]) => {
    const _distance = turf.distance(
        turf.point(coordinates1),
        turf.point(coordinates2)
    )
    //se precisar, validar depois...
    return _distance
}


module.exports = {

    distance,

}