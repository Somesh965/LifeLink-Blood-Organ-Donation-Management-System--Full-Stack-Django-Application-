import { useEffect, useState } from "react";
import "./Home.css";
import logo from "../../assets/logo/logo.png";
import hero from "../../assets/Images/hero.jpg";
import { getDashboardStatistics } from "../../api/dashboardApi";

function Home() {

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
            const response = await getDashboardStatistics();

            setStats(response);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <section
            className="hero-section"
            style={{
                backgroundImage: `url(${hero})`
            }}
        >

            <div className="overlay">

                <div className="container">

                    <div className="row align-items-center vh-100">

                        {/* LEFT */}

                        <div className="col-lg-5">

                            <img
                                src={logo}
                                width="180"
                                alt="LifeLink"
                            />

                            <h1 className="display-3 fw-bold mt-4 text-dark">

                                A Small Act of

                                <br />

                                Kindness Can

                                <br />

                                <span className="text-danger">
                                    Save a Life
                                </span>

                            </h1>

                            <p className="lead mt-4">

                                Join our mission of hope and make a difference
                                through Blood & Organ Donation.

                            </p>

                            <button className="btn btn-danger btn-lg me-3">

                                Donate Blood

                            </button>

                            <button className="btn btn-outline-success btn-lg">

                                Donate Organ

                            </button>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-7">

                            <div className="stats">

                                <div>
                                    <h2>{stats.totalDonations}</h2>
                                    <p>Blood Donations</p>
                                </div>

                                <div>
                                    <h2>{stats.totalRecipients}</h2>
                                    <p>Recipients</p>
                                </div>

                                <div>
                                    <h2>{stats.totalDonors}</h2>
                                    <p>Registered Donors</p>
                                </div>

                                <div>
                                    <h2>{stats.totalOrganDonations}</h2>
                                    <p>Organ Donations</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Home;