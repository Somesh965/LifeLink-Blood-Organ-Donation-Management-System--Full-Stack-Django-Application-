import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBloodBank } from "../../api/bloodBankApi";

function ViewBloodBank() {

    const { id } = useParams();

    const [bloodBank, setBloodBank] = useState(null);

    useEffect(() => {
        loadBloodBank();
    }, []);

    const loadBloodBank = async () => {

        try {

            const response = await getBloodBank(id);

            setBloodBank(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Blood Bank");

        }

    };

    if (!bloodBank) {

        return <h4 className="text-center mt-5">Loading...</h4>;

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Blood Bank Details</h3>

                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>ID</th>
                                <td>{bloodBank.id}</td>
                            </tr>

                            <tr>
                                <th>Blood Bank Name</th>
                                <td>{bloodBank.blood_bank_name}</td>
                            </tr>

                            <tr>
                                <th>License Number</th>
                                <td>{bloodBank.license_number}</td>
                            </tr>

                            <tr>
                                <th>Contact Person</th>
                                <td>{bloodBank.contact_person}</td>
                            </tr>

                            <tr>
                                <th>Phone Number</th>
                                <td>{bloodBank.phone_number}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{bloodBank.email}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{bloodBank.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{bloodBank.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{bloodBank.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{bloodBank.pincode}</td>
                            </tr>

                            <tr>
                                <th>Blood Group</th>
                                <td>{bloodBank.blood_group}</td>
                            </tr>

                            <tr>
                                <th>Available Units</th>
                                <td>{bloodBank.available_units}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{bloodBank.status}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/bloodbanks"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ViewBloodBank;