import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
          <Link to="/mytasks">my tasks</Link>
          {user ? (
            <button onClick={signOut}>sign out</button>
          ) : (
            <Link to="/login">sign in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
