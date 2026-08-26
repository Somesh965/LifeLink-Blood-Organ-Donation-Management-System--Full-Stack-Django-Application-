import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrganDonation } from "../../api/organDonationApi";

function ViewOrganDonation() {

    const { id } = useParams();

    const [organDonation, setOrganDonation] = useState(null);

    useEffect(() => {
        loadOrganDonation();
    }, []);

    const loadOrganDonation = async () => {

        try {

            const response = await getOrganDonation(id);

            setOrganDonation(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Organ Donation");

        }

    };

    if (!organDonation) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Organ Donation Details</h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{organDonation.id}</td>
                            </tr>

                            <tr>
                                <th>Donor</th>
                                <td>{organDonation.donor}</td>
                            </tr>

                            <tr>
                                <th>Recipient</th>
                                <td>{organDonation.recipient}</td>
                            </tr>

                            <tr>
                                <th>Hospital</th>
                                <td>{organDonation.hospital}</td>
                            </tr>

                            <tr>
                                <th>Organ</th>
                                <td>{organDonation.organ_name}</td>
                            </tr>

                            <tr>
                                <th>Donation Date</th>
                                <td>{organDonation.donation_date}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{organDonation.status}</td>
                            </tr>

                            <tr>
                                <th>Remarks</th>
                                <td>{organDonation.remarks}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/organdonations"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewOrganDonation;