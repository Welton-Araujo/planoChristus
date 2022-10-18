/**
 * @AWS Comunicação diretamente com a API AWS:
*/

const AWS = require('aws-sdk')
const { AWS: AWSCONF } = require('../../../config')


module.exports = {

    IAM_USER_KEY:       AWSCONF.IAM_USER_KEY,
    IAM_USER_SECRET:    AWSCONF.IAM_USER_SECRET,
    BUCKET_NAME:        AWSCONF.BUCKET_NAME,
    AWS_REGION:         AWSCONF.AWS_REGION,

    /**
     * 
     * @param {*} file Arquivo
     * @param {*} filename path:service/6346b370c8edd23aa9295c5e/1665752480449.jpg
     * @param {*} acl 'public-read'
     * @returns Promise
     */
    uploadToS3: function(file, filename, acl='public-read') {
        return new Promise((resolve, reject)=>{
            let IAM_USER_KEY = this.IAM_USER_KEY
            let IAM_USER_SECRET = this.IAM_USER_SECRET
            let BUCKET_NAME = this.BUCKET_NAME
            let AWS_REGION = this.AWS_REGION

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME,
            })

            s3bucket.createBucket(function(){
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: filename,
                    Body: file.data,
                    ACL: acl,
                }

                s3bucket.upload(params, function(err, data){
                    if(err){
                        console.log('AWS err:', err)
                        return resolve({ error: true, message: err.message })
                    }
                    console.log('AWS data:', data)
                    return resolve({ error: false, message: data })
                })
            })
        })
    },
    
    /**
     * 
     * @param {*} key 
     * @returns Promise
     */
    deleteFileS3: function(key) {
        return new Promise((resolve, reject)=>{
            let IAM_USER_KEY = this.IAM_USER_KEY
            let IAM_USER_SECRET = this.IAM_USER_SECRET
            let BUCKET_NAME = this.BUCKET_NAME

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME,
            })
            
            s3bucket.createBucket(function(){
                s3bucket.deleteObject({ Bucket: BUCKET_NAME, Key: key }, function (err, data) {
                    if(err){
                        console.log('AWS error: ', err)
                        return resolve({ error: true, message: err.message })
                    }
                    console.log('AWS data: ', data)
                    return resolve({ error: false, message: data })
                })
            })
        })
    }
}