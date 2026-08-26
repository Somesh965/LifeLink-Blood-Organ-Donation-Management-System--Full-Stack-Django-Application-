import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganDonation } from "../../api/organDonationApi";

function AddOrganDonation() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donor: "",
        recipient: "",
        hospital: "",
        organ_name: "",
        donation_date: "",
        status: "Pending",
        remarks: "",
    });

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

            await createOrganDonation(formData);

            alert("Organ Donation Added Successfully");

            navigate("/organdonations");

        } catch (error) {

            console.error(error);

            alert("Failed to Add Organ Donation");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Add Organ Donation</h3>

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
                                <label>Organ</label>

                                <select
                                    className="form-select"
                                    name="organ_name"
                                    value={formData.organ_name}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Organ</option>
                                    <option value="Kidney">Kidney</option>
                                    <option value="Liver">Liver</option>
                                    <option value="Heart">Heart</option>
                                    <option value="Lungs">Lungs</option>
                                    <option value="Pancreas">Pancreas</option>
                                    <option value="Cornea">Cornea</option>
                                    <option value="Bone Marrow">Bone Marrow</option>
                                </select>

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
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option>Pending</option>
                                    <option>Approved</option>
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
                            className="btn btn-success"
                        >
                            Save Organ Donation
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddOrganDonation;