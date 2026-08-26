import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBloodRequest } from "../../api/bloodRequestApi";

function ViewBloodRequest() {

    const { id } = useParams();

    const [bloodRequest, setBloodRequest] = useState(null);

    useEffect(() => {
        loadBloodRequest();
    }, []);

    const loadBloodRequest = async () => {

        try {

            const response = await getBloodRequest(id);

            setBloodRequest(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Blood Request");

        }

    };

    if (!bloodRequest) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">
                    <h3>Blood Request Details</h3>
                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{bloodRequest.id}</td>
                            </tr>

                            <tr>
                                <th>Patient Name</th>
                                <td>{bloodRequest.patient_name}</td>
                            </tr>

                            <tr>
                                <th>Patient Age</th>
                                <td>{bloodRequest.patient_age}</td>
                            </tr>

                            <tr>
                                <th>Blood Group</th>
                                <td>{bloodRequest.blood_group}</td>
                            </tr>

                            <tr>
                                <th>Units Required</th>
                                <td>{bloodRequest.units_required}</td>
                            </tr>

                            <tr>
                                <th>Hospital Name</th>
                                <td>{bloodRequest.hospital_name}</td>
                            </tr>

                            <tr>
                                <th>Hospital Address</th>
                                <td>{bloodRequest.hospital_address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{bloodRequest.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{bloodRequest.state}</td>
                            </tr>

                            <tr>
                                <th>Reason</th>
                                <td>{bloodRequest.reason}</td>
                            </tr>

                            <tr>
                                <th>Urgency</th>
                                <td>{bloodRequest.urgency}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{bloodRequest.status}</td>
                            </tr>

                            <tr>
                                <th>Required Date</th>
                                <td>{bloodRequest.required_date}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/bloodrequests"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default ViewBloodRequest;