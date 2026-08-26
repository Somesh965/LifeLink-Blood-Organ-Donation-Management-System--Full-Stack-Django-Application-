import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDonation } from "../../api/donationApi";

function ViewDonation() {

    const { id } = useParams();

    const [donation, setDonation] = useState(null);

    useEffect(() => {
        loadDonation();
    }, []);

    const loadDonation = async () => {

        try {

            const response = await getDonation(id);

            setDonation(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Donation");

        }

    };

    if (!donation) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Donation Details</h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{donation.id}</td>
                            </tr>

                            <tr>
                                <th>Donor</th>
                                <td>{donation.donor}</td>
                            </tr>

                            <tr>
                                <th>Recipient</th>
                                <td>{donation.recipient}</td>
                            </tr>

                            <tr>
                                <th>Blood Request</th>
                                <td>{donation.blood_request}</td>
                            </tr>

                            <tr>
                                <th>Hospital</th>
                                <td>{donation.hospital}</td>
                            </tr>

                            <tr>
                                <th>Blood Group</th>
                                <td>{donation.blood_group}</td>
                            </tr>

                            <tr>
                                <th>Units Donated</th>
                                <td>{donation.units_donated}</td>
                            </tr>

                            <tr>
                                <th>Donation Date</th>
                                <td>{donation.donation_date}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{donation.donation_status}</td>
                            </tr>

                            <tr>
                                <th>Remarks</th>
                                <td>{donation.remarks}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/donations"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewDonation;