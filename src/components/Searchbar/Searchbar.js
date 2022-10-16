import {useState} from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {FaSearchengin} from "react-icons/fa";


function Searchbar ({onSubmitForm}) {
  const [searchName, setSearchName] = useState('');

function handleChangeName (event) {
  return setSearchName(event.currentTarget.value.toLowerCase())}

function handleSubmit (event) {
  event.preventDefault();
  if(searchName.trim() === ''){return toast.warn('Прошу внести дані для пошуку!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })}
  onSubmitForm(searchName);
  setSearchName('')
}

return (
<header className="Searchbar">
  <form className="SearchForm" onSubmit={handleSubmit}>
    <button type="submit" className="SearchForm-button" ><FaSearchengin style={{width:30, height: 30, fill: "blue"}}/>
      <span className="SearchForm-button-label">Search</span>
    </button>
    <input
      className="SearchForm-input"
      type="text"
      autoComplete="true"
      autoFocus={true}
      placeholder="Search images and photos"
      value={searchName}
      onChange={handleChangeName}
    />
  </form>
</header>)
}

export default Searchbar

Searchbar.propTypes = {
searchName :  PropTypes.string
}
