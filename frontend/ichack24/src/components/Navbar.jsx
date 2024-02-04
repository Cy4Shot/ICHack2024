import { useState } from "react";
import "./../style/home.scss";

const Navbar = () => {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <div className="home-styling">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            {/* <img src={logolight} alt="IntervalBeat" /> */}
          </a>

          <a
            role="button"
            className={"navbar-burger" + (burgerActive ? " is-active" : "")}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setBurgerActive(!burgerActive);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={"navbar-menu" + (burgerActive ? " is-active" : "")}>
          <div className="navbar-start">
            <a className="navbar-item" href="/" data-content=" Home ">
              {" "}
              Home{" "}
            </a>

            <a
              className="navbar-item"
              href="/products"
              data-content=" Products "
            >
              {" "}
              Products{" "}
            </a>
            <a
              className="navbar-item"
              href="/services"
              data-content=" Services "
            >
              {" "}
              Services{" "}
            </a>
            <a className="navbar-item" href="/shop" data-content=" Shop ">
              {" "}
              Shop{" "}
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a
                className="navbar-link is-arrowless"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {" "}
                More{" "}
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="/about">
                  {" "}
                  About Us{" "}
                </a>
                <a className="navbar-item" href="/jobs">
                  {" "}
                  Jobs{" "}
                </a>
                <a className="navbar-item" href="/contact">
                  {" "}
                  Contact{" "}
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="/report">
                  {" "}
                  Report an issue{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
