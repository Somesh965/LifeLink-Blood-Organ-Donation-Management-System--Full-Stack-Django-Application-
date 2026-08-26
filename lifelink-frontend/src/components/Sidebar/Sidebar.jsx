import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

function Sidebar() {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Remove authentication data
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        // Redirect to Login page
        navigate("/login", { replace: true });
    };

    return (
        <div
            className="bg-dark text-white vh-100 p-3 d-flex flex-column"
            style={{ width: "250px" }}
        >

            {/* ================= LOGO ================= */}
            <div className="text-center mb-4">
                <img
                    src={logo}
                    alt="LifeLink"
                    width="150"
                />
            </div>


            {/* ================= MENU ================= */}
            <ul className="nav flex-column">

                {/* Dashboard */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>


                {/* Donors */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/donors"
                    >
                        Donors
                    </Link>
                </li>


                {/* Recipients */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/recipients"
                    >
                        Recipients
                    </Link>
                </li>


                {/* Blood Requests */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/bloodrequests"
                    >
                        Blood Requests
                    </Link>
                </li>


                {/* Blood Banks */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/bloodbanks"
                    >
                        Blood Banks
                    </Link>
                </li>


                {/* Hospitals */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/hospitals"
                    >
                        Hospitals
                    </Link>
                </li>


                {/* Donations */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/donations"
                    >
                        Donations
                    </Link>
                </li>


                {/* Organ Donations */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/organdonations"
                    >
                        Organ Donations
                    </Link>
                </li>


                {/* Profile */}
                <li className="nav-item mb-2">
                    <Link
                        className="nav-link text-white"
                        to="/profile"
                    >
                        Profile
                    </Link>
                </li>

            </ul>


            {/* ================= LOGOUT ================= */}
            <div className="mt-auto">

                <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;