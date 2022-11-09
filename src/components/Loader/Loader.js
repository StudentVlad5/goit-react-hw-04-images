import { ImBinoculars } from "react-icons/im";
import PropTypes from 'prop-types';

const Loader = ({handleimageCount}) => {
return(
        <div className="Loader-button-container">
            <button className="Button" type="button" onClick={()=>{handleimageCount()}}> LoadMore
                <ImBinoculars style={{width:40, fill:"white",transform: 'scale(1.7)',
                marginLeft: 10}}/>
            </button>{' '}
        </div>
    )}

export default Loader

Loader.propTypes = {
    handleimageCount : PropTypes.func
  }