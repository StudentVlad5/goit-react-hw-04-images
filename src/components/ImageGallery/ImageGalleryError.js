import ErrorImg from './labrador_foto.jpg'

const ImageGalleryError = ({message}) =>
<div className='error-Container' role="alert">
    <img src={ErrorImg} alt='Sad dog' width='300'/>
    <p>{message}</p>
</div>

export default ImageGalleryError

