import React from "react";
import {Link} from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                    <Link to="/mytasks">my tasks</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;