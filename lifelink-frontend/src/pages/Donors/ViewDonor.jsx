import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDonor } from "../../api/donorApi";

function ViewDonor() {
    const { id } = useParams();

    const [donor, setDonor] = useState(null);

    useEffect(() => {
        loadDonor();
    }, []);

    const loadDonor = async () => {
        try {
            const response = await getDonor(id);
            setDonor(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!donor) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Donor Details</h3>
                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{donor.id}</td>
                            </tr>

                            <tr>
                                <th>User</th>
                                <td>{donor.user}</td>
                            </tr>

                            <tr>
                                <th>Weight</th>
                                <td>{donor.weight}</td>
                            </tr>

                            <tr>
                                <th>Last Donation Date</th>
                                <td>{donor.last_donation_date}</td>
                            </tr>

                            <tr>
                                <th>Medical Conditions</th>
                                <td>{donor.medical_conditions}</td>
                            </tr>

                            <tr>
                                <th>Emergency Contact</th>
                                <td>{donor.emergency_contact_name}</td>
                            </tr>

                            <tr>
                                <th>Emergency Number</th>
                                <td>{donor.emergency_contact_number}</td>
                            </tr>

                            <tr>
                                <th>Availability</th>
                                <td>{donor.availability_status}</td>
                            </tr>

                            <tr>
                                <th>Eligible</th>
                                <td>
                                    {donor.is_eligible ? "Yes" : "No"}
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/donors"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ViewDonor;