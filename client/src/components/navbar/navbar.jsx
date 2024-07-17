import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

import logo from "../../assets/images/wheel.svg";
import "../../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/" className="avatar-link">
          <img src={logo} alt="logo" />
          <div className="logo-text">
            <p>Wheel</p>
            <p>Wisdom</p>
          </div>
        </Link>
      </div>
      <div className="avatar">
        <Link to="/" className="avatar-link">
          <RxAvatar className="avatar-icon" />
        </Link>
      </div>
    </nav>
  );
}
