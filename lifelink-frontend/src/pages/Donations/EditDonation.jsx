import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDonation,
    updateDonation,
} from "../../api/donationApi";

function EditDonation() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donor: "",
        recipient: "",
        blood_request: "",
        hospital: "",
        blood_group: "",
        units_donated: "",
        donation_date: "",
        donation_status: "Scheduled",
        remarks: "",
    });

    useEffect(() => {
        loadDonation();
    }, []);

    const loadDonation = async () => {

        try {

            const response = await getDonation(id);

            setFormData(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Donation");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateDonation(id, formData);

            alert("Donation Updated Successfully");

            navigate("/donations");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Edit Donation</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Donor ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="donor"
                                    value={formData.donor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Recipient ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="recipient"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Blood Request ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="blood_request"
                                    value={formData.blood_request}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Hospital ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Blood Group</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Units Donated</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="units_donated"
                                    value={formData.units_donated}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Donation Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="donation_date"
                                    value={formData.donation_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Status</label>
                                <select
                                    className="form-select"
                                    name="donation_status"
                                    value={formData.donation_status}
                                    onChange={handleChange}
                                >
                                    <option>Scheduled</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Remarks</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Donation
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/donations")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditDonation;