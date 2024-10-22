import React, { useState } from 'react';
import "./style.css";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className='dropdown-background'>
         
        </div>
        <div className="dropdown-list">
            Menu
          </div>
        {/* <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div> */}
    </div>
  );
};

export default DropdownMenu;
