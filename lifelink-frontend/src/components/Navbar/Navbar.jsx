import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

function Navbar() {
    const navigate = useNavigate();

    // Check whether user is logged in
    const isLoggedIn = localStorage.getItem("access_token");

    const handleLogout = () => {
        // Remove authentication tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Remove stored user data if available
        localStorage.removeItem("user");

        // Go to login page
        navigate("/login", { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="LifeLink"
                        height="55"
                    />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="/about"
                            >
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link fw-semibold"
                                to="/services"
                            >
                                Services
                            </Link>
                        </li>

                    </ul>

                    {/* Right Side Buttons */}
                    <div className="d-flex">

                        {isLoggedIn ? (
                            // LOGGED IN
                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            // NOT LOGGED IN
                            <>
                                <Link
                                    className="btn btn-outline-danger me-2"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="btn btn-danger"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;