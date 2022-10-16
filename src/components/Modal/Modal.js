import {createPortal} from 'react-dom';
import {FaRegWindowClose} from 'react-icons/fa';

const modalRoot = document.querySelector('#modal-root');
const  Modal = ({largeImage, closeModalWindow, handleKeyDown}) => { 
   return (createPortal(
    <div className='Overlay' onClick={closeModalWindow} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className='Modal' onClick={(e)=>e.stopPropagation()} style={{backgroundImage:`url(${largeImage.src})`}}> 
         <button className="button" type="button" onClick={(e)=>closeModalWindow(e)}><FaRegWindowClose style={{width:30, height: 30, fill: "blue"}}/></button>
      </div>
   </div>, modalRoot)
 )       
}
export default Modal