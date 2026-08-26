import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipient } from "../../api/recipientApi";

function AddRecipient() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        request_type: "Blood",
        hospital_name: "",
        diagnosis: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        is_active: true,
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

            await createRecipient(formData);

            alert("Recipient Added Successfully");

            navigate("/recipients");

        } catch (error) {

            console.error(error);

            alert("Failed to Add Recipient");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Add Recipient</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Request Type

                            </label>

                            <select
                                className="form-select"
                                name="request_type"
                                value={formData.request_type}
                                onChange={handleChange}
                            >
                                <option value="Blood">Blood</option>
                                <option value="Organ">Organ</option>
                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Hospital Name

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="hospital_name"
                                value={formData.hospital_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Diagnosis

                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

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

                        <div className="mb-3">

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

                        <div className="form-check mb-3">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">

                                Active Recipient

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Recipient
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddRecipient;