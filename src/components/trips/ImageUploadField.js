import React from 'react'

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
console.log(uploadPreset)

function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState('')

  function handleUpload() {

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dvxtec1zs',
          uploadPreset: 'dw7nlouv',
          sources: ['local'],
          multiple: false,
        }, (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImage(result.info.url)
            onUpload(result.info.url)
          }
        }
      )
      .open()
  }

  return (
    <>
      {image && <p>Imgae uploaded</p>}
      {!image && <button onClick={handleUpload} type="button" className="button is-info is-fullwidth">Upload Image</button>}
    </>
  )
}

export default ImageUpload