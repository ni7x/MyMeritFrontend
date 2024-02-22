import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
          <Link to="/mytasks">my tasks</Link>
          {isAuthenticated() === false && <Link to="/login">log in </Link>}
          {isAuthenticated() === true && (
            <button onClick={signOut}>log out</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
