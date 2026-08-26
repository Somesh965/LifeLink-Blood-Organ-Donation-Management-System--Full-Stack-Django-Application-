import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

function DashboardLayout() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <div className="container-fluid p-4">

                    <Outlet />

                </div>

                <Footer />

            </div>

        </div>
    );
}

export default DashboardLayout;