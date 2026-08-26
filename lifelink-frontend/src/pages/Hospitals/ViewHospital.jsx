import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHospital } from "../../api/hospitalApi";

function ViewHospital() {

    const { id } = useParams();

    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        loadHospital();
    }, []);

    const loadHospital = async () => {

        try {

            const response = await getHospital(id);

            setHospital(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Hospital");

        }

    };

    if (!hospital) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">
                    <h3>Hospital Details</h3>
                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{hospital.id}</td>
                            </tr>

                            <tr>
                                <th>Hospital Name</th>
                                <td>{hospital.hospital_name}</td>
                            </tr>

                            <tr>
                                <th>Registration Number</th>
                                <td>{hospital.registration_number}</td>
                            </tr>

                            <tr>
                                <th>Hospital Type</th>
                                <td>{hospital.hospital_type}</td>
                            </tr>

                            <tr>
                                <th>Contact Person</th>
                                <td>{hospital.contact_person}</td>
                            </tr>

                            <tr>
                                <th>Phone Number</th>
                                <td>{hospital.phone_number}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{hospital.email}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{hospital.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{hospital.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{hospital.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{hospital.pincode}</td>
                            </tr>

                            <tr>
                                <th>Emergency Contact</th>
                                <td>{hospital.emergency_contact}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{hospital.status}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/hospitals"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewHospital;