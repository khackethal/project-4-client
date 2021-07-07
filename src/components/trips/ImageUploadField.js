import React from 'react'

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState('')

  function handleUpload() {

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dvxtec1zs',
          uploadPreset: uploadPreset,
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
      {image && <p>Image uploaded</p>}
      {!image && <button className="image-upload-button" onClick={handleUpload} type="button" >Upload Image</button>}
    </>
  )
}

export default ImageUpload