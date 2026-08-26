import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipient } from "../../api/recipientApi";

function ViewRecipient() {

    const { id } = useParams();

    const [recipient, setRecipient] = useState(null);

    useEffect(() => {
        loadRecipient();
    }, []);

    const loadRecipient = async () => {

        try {

            const response = await getRecipient(id);

            setRecipient(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load recipient.");

        }

    };

    if (!recipient) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Recipient Details</h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{recipient.id}</td>
                            </tr>

                            <tr>
                                <th>User</th>
                                <td>{recipient.user}</td>
                            </tr>

                            <tr>
                                <th>Request Type</th>
                                <td>{recipient.request_type}</td>
                            </tr>

                            <tr>
                                <th>Hospital Name</th>
                                <td>{recipient.hospital_name}</td>
                            </tr>

                            <tr>
                                <th>Diagnosis</th>
                                <td>{recipient.diagnosis}</td>
                            </tr>

                            <tr>
                                <th>Emergency Contact</th>
                                <td>{recipient.emergency_contact_name}</td>
                            </tr>

                            <tr>
                                <th>Emergency Number</th>
                                <td>{recipient.emergency_contact_number}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>
                                    {recipient.is_active ? "Active" : "Inactive"}
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/recipients"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewRecipient;