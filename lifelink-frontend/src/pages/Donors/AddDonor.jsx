import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDonor } from "../../api/donorApi";

function AddDonor() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        weight: "",
        last_donation_date: "",
        medical_conditions: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        availability_status: "Available",
        is_eligible: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createDonor(formData);

            alert("Donor added successfully!");

            console.log(response.data);

            navigate("/donors");

        } catch (error) {
            console.error(error.response?.data);

            alert(
                JSON.stringify(
                    error.response?.data || "Failed to add donor",
                    null,
                    2
                )
            );
        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Add Donor</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Weight (kg)
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Last Donation Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="last_donation_date"
                                    value={formData.last_donation_date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label">
                                    Medical Conditions
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="medical_conditions"
                                    value={formData.medical_conditions}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Emergency Contact Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="emergency_contact_name"
                                    value={formData.emergency_contact_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Emergency Contact Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="emergency_contact_number"
                                    value={formData.emergency_contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Availability Status
                                </label>

                                <select
                                    className="form-select"
                                    name="availability_status"
                                    value={formData.availability_status}
                                    onChange={handleChange}
                                >
                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Unavailable">
                                        Unavailable
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3 d-flex align-items-center">

                                <div className="form-check mt-4">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="is_eligible"
                                        checked={formData.is_eligible}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">
                                        Eligible to Donate
                                    </label>

                                </div>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Save Donor
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/donors")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddDonor;