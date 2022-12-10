/**
 * @OPERATIONS
 * @IMAGE
*/

/**
 * @Info Criar um atributo meta{} dentro do files_obj
 * @param {*} files Object { fileData_1, ... }
 * @returns files 
 */
const insertManyMeta = (files={})=>{
    for (const key in files) {
        files[key]['meta'] = createMetadata(files[key])
    }
    return files
}

/**
 * @Info Gera um meta a partir de uma image
 * @param {*} file file_image_data
 * @returns meta {...}
 */
const createMetadata = (file={})=>{
    return {
        name: file?.name,
        encoding: file?.encoding,
        mimetype: file?.mimetype,
        truncated: file?.truncated,
        size: file?.size
    }
}


module.exports = {

    insertManyMeta,
    createMetadata,

}