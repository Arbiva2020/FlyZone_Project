import React, {useState, useEffect} from 'react'
import Input from '../Generic/Input/Input';
import "./SearchPopup.css"
import { FaSearch } from "react-icons/fa"
import Button from '../Generic/Button/Button'

const SearchPopup = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const handleClose = (e) => {
        setShowPopup(false);
        props.onClose(false);
    };

    useEffect(()=> {
        setShowPopup(props.showPopup);
    }, [props.showPopup]);

    const handleSearchUser = () => {
        console.log("searching...")
    }


  return (
    <div
        style={{visibility: showPopup ? "visible" : "hidden", opacity: showPopup ? "1" : "0"}} className='SearchPopup_main'
    >
        <div className='searchPopup_message'>
            <h2>Search Term</h2>
            <div className='searchPopup_input'>
                <Input />
                <i className='searchPopup_searchIcon'><FaSearch onClick={handleSearchUser} style={{cursor: 'pointer'}}/></i>
            </div>
            <div>Error message of some kind</div>
        </div>
        
    </div>
  )
}

export default SearchPopup