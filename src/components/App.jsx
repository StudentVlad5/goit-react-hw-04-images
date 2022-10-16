import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export default function App () {
const [imgSearchName, setimgSearchName] = useState('');

function handleFormSubmit (searchName) {
setimgSearchName((imgSearchName) => imgSearchName = searchName)
}

  return (
    <div className="App">
        <Searchbar onSubmitForm={handleFormSubmit}/>
        {imgSearchName.length >0 &&<ImageGallery imgSearchName={imgSearchName}/>}
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        
  </div>
  );
}

App.propTypes = {
  imgSearchName :  PropTypes.string
  }
  