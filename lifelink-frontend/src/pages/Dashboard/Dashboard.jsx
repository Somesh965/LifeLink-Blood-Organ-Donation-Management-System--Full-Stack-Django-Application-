import { useEffect, useState } from "react";
import { getDashboardStatistics } from "../../api/dashboardApi";

function Dashboard() {

    const [stats, setStats] = useState({
        totalDonors: 0,
        totalRecipients: 0,
        totalBloodRequests: 0,
        totalBloodBanks: 0,
        totalHospitals: 0,
        totalDonations: 0,
        totalOrganDonations: 0,
    });

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {

        try {

            const data = await getDashboardStatistics();
            console.log(data)

            setStats(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4 fw-bold">
                Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Total Donors</h5>

                            <h1 className="display-4 text-danger">
                                {stats.totalDonors}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Total Recipients</h5>

                            <h1 className="display-4 text-primary">
                                {stats.totalRecipients}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Blood Requests</h5>

                            <h1 className="display-4 text-warning">
                                {stats.totalBloodRequests}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Blood Banks</h5>

                            <h1 className="display-4 text-success">
                                {stats.totalBloodBanks}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Hospitals</h5>

                            <h1 className="display-4 text-info">
                                {stats.totalHospitals}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Blood Donations</h5>

                            <h1 className="display-4 text-danger">
                                {stats.totalDonations}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="card shadow border-0 text-center">

                        <div className="card-body">

                            <h5>Organ Donations</h5>

                            <h1 className="display-4 text-success">
                                {stats.totalOrganDonations}
                            </h1>

                        </div>

                    </div>

                </div>

            </div>

            <div className="text-center mt-5 text-muted">

                © 2026 LifeLink Blood & Organ Donation Management System

            </div>

        </div>

    );

}

export default Dashboard;