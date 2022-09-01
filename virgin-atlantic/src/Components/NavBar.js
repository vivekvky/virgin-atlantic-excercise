import "./NavBar.css";

import {
    useHistory,Link
} from "react-router-dom";


const NavBar = () => {
    const history = useHistory()
    return (<>
        <header className="navbar">
            <div className="navbar__title navbar__item" onClick={()=>history.push('./home')} >
            Virgin Atlantic
            </div>
            <div className="navbar__item" onClick={()=>history.push('./about')}>About Us</div>
            <div className="navbar__item" onClick={()=>history.push('./contact')}>Contact</div>
        </header>
    </>)
};

export default NavBar;
