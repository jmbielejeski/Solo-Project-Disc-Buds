import S3Upload from 'react-s3-uploader/s3upload'
import Dropzone from 'react-dropzone'

function DropzoneS3Uploader() {

const uploadOptions = {
    server: 'http://localhost:5000'
  }
  const s3Url = 'https://disc-buds-profile-pictures.s3.amazonaws.com'
    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    )
}

export default DropzoneS3Uploader;