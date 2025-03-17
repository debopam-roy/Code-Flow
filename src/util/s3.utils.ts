import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

function extractKeyFromS3Url(url: string): string {
  const regex = /^https:\/\/([^\/]+)\/(.+)$/;
  const match = url.match(regex);

  if (match) {
    const bucketName = match[1];
    const key = match[2];
    return key;
  } else {
    throw new Error('Invalid S3 URL format');
  }
}

export async function uploadFileToS3(
  buffer: Buffer,
  key: string,
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/jpeg',
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
}

export async function deleteFileFromS3(key: string): Promise<void> {
  const object_key = extractKeyFromS3Url(key);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: object_key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully from S3: ${key}`);
  } catch (error) {
    console.error(`Failed to delete file from S3: ${key}`, error);
    throw new Error(`Could not delete file: ${key}`);
  }
}
