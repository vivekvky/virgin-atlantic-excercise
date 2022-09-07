import classes from  "./NavBar.module.css";

import {
    useHistory
} from "react-router-dom";


const NavBar = () => {
    const history = useHistory()
    return (<>
        <header className={classes.navbar}>
            <div className={`${classes['navbar__title']} ${classes['navbar__item']}`}
            onClick={()=>history.push('./home')} >
            Virgin Atlantic
            </div>
            <div className={classes["navbar__item"]} onClick={()=>history.push('./about')}>About Us</div>
            <div className={classes["navbar__item"]} onClick={()=>history.push('./contact')}>Contact</div>
        </header>
    </>)
};

export default NavBar;
