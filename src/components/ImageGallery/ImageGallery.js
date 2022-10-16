import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImageGalleryError from './ImageGalleryError';
import ImageGalleryPending from './ImageGalleryPending';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';


function ImageGallery ({imgSearchName}) {

const [images, setImages] = useState('');
const [error, setError] = useState(null);
const [imageCount, setImageCount] = useState(1);
const [status, setStatus] = useState('idle');
const [totalImg, setTotalImg] = useState(0);
const [statusMore, setStatusMore] = useState('idle');
const [visibility, setVisibility] = useState(false);
const [scroll, setScroll] = useState(false);
const [largeImage, setLargeImage] = useState('');
const [addLsnEsc, setAddLsnEsc] = useState('');
const [nameForSearch, setNameForSearch] = useState('')

let itemForFetch = `https://pixabay.com/api/?q=${imgSearchName}&page=${imageCount}&key=29531534-c6f4c4079f81828b6fd250707&image_type=photo&orientation=horizontal&per_page=12`

useEffect(()=>{
    if(nameForSearch !== imgSearchName){
    setImageCount(1);
    setStatus('pending');
    async function fetchImgSearchName () {
        await fetch(itemForFetch)
        .then(res=>{if(res.ok) {return res.json()} 
        return Promise.reject(new Error(`Can't find anything with {imgSearchName}`))})
        .then(img => {
            setImages(img.hits);
            setStatus('resolved');
            setTotalImg(img.total);
            setNameForSearch(imgSearchName);
            setLargeImage('');
        })
        .catch(error=>{
            setError(error);
            setStatus('reject')
        })
    }
    fetchImgSearchName()    
}}
,[imgSearchName, itemForFetch, nameForSearch])
 
useEffect(()=>{
    if(nameForSearch === imgSearchName){
        setStatusMore('pendingMore');
        async function fetchPendingMore () {
            setScroll(false);
            await fetch(itemForFetch)
            .then(res=>{if(res.ok){return res.json()}
            return Promise.reject(new Error(`Can't find anything with {imgSearchName}`))})
            .then(img => {
                setImages((images) => images.concat(img.hits));
                setStatus('resolved');
                setStatusMore('idle');
                setScroll(true);
            })
            .catch(error=>{
                setError(error);
                setStatus('reject')
            })
        }
        fetchPendingMore();
    }
}
    ,[imageCount, imgSearchName, itemForFetch, nameForSearch])

useEffect(()=>{
    window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    })
    },[scroll])

function handleImageCount () {  
    setImageCount(imageCount=> imageCount+1);
    setScroll(true)
   }

function startModalWindow (e) {
setAddLsnEsc(document.addEventListener('keydown', handleKeyDown));
setVisibility(true);
setLargeImage(e.target);
setScroll(false)
}

function closeModalWindow (e) {
document.removeEventListener('keydown',addLsnEsc)
setVisibility(false);
setScroll(false)
}

function handleKeyDown (e) {
    if (e.key === "Escape"){ 
    document.removeEventListener('keydown', addLsnEsc);
    setVisibility(false);
    setScroll(false)
    }
  };

    if(status === 'idle'){return(
        <div className='SearchMessage'>Очікуємо на запит</div>
    )}

    if(status === 'reject'){return(
        <ImageGalleryError message={error}/>
    )}

    if(status === 'resolved'){ return (
    <div>
        {totalImg === 0 && <h1>Упс, не знайшли такі фото. Спробуйте змінити дані пошуку</h1>}
        <ul className="ImageGallery">
        <ImageGalleryItem liItem={images} startModalWindow={startModalWindow}/>
        </ul>
        {(totalImg - imageCount * 12) > 0 && statusMore !== 'pendingMore' && <Loader handleimageCount={handleImageCount}/>}
        {statusMore === 'pendingMore' && <ImageGalleryPending/>}
        {visibility && <Modal largeImage={largeImage} closeModalWindow={closeModalWindow} handleKeyDown={handleKeyDown}/> }
    </div>
    )}
        
    if(status === 'pending'){ return(
        <ImageGalleryPending/>
    )}
 }



export default ImageGallery



ImageGallery.propTypes = {
    images : PropTypes.string,
    error : PropTypes.string,
    imageCount : PropTypes.number,
    status : PropTypes.string,
    totalImg : PropTypes.string, 
    statusMore : PropTypes.string,
    visibility : PropTypes.bool,
    scroll : PropTypes.bool,
}