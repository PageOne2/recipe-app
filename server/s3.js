const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const awsBucketName = process.env.AWS_BUCKET_NAME;
const awsBucketRegion = process.env.AWS__REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3({
  awsBucketRegion,
  awsAccessKey,
  awsSecretKey
});

exports.uploadFile = (file) => {
  try {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: awsBucketName,
      Body: fileStream,
      Key: file.filename
    }

    return s3.upload(uploadParams).promise();
  } catch (err) {
    console.log(err)
  }
} 

exports.getFile = async (fileKey) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: awsBucketName
    }
    await s3.headObject(downloadParams).promise();
    return s3.getObject(downloadParams).createReadStream();
  } catch (err) {
    return undefined;
  }
}