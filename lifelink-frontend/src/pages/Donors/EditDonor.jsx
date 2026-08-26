import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDonor, updateDonor } from "../../api/donorApi";

function EditDonor() {
    const { id } = useParams();
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

    useEffect(() => {
        fetchDonor();
    }, []);

    const fetchDonor = async () => {
        try {
            const response = await getDonor(id);

            setFormData({
                weight: response.data.weight || "",
                last_donation_date: response.data.last_donation_date || "",
                medical_conditions: response.data.medical_conditions || "",
                emergency_contact_name: response.data.emergency_contact_name || "",
                emergency_contact_number: response.data.emergency_contact_number || "",
                availability_status: response.data.availability_status || "Available",
                is_eligible: response.data.is_eligible,
            });

        } catch (error) {
            console.error(error);
        }
    };

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
            await updateDonor(id, formData);

            alert("Donor Updated Successfully");

            navigate("/donors");

        } catch (error) {
            console.error(error.response?.data);
            alert("Update Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">
                    <h3>Edit Donor</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Weight</label>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Last Donation Date</label>
                            <input
                                className="form-control"
                                type="date"
                                name="last_donation_date"
                                value={formData.last_donation_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Medical Conditions</label>
                            <textarea
                                className="form-control"
                                name="medical_conditions"
                                value={formData.medical_conditions}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Emergency Contact Name</label>
                            <input
                                className="form-control"
                                name="emergency_contact_name"
                                value={formData.emergency_contact_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Emergency Contact Number</label>
                            <input
                                className="form-control"
                                name="emergency_contact_number"
                                value={formData.emergency_contact_number}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Availability</label>

                            <select
                                className="form-select"
                                name="availability_status"
                                value={formData.availability_status}
                                onChange={handleChange}
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>

                        </div>

                        <div className="form-check mb-3">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="is_eligible"
                                checked={formData.is_eligible}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                Eligible
                            </label>

                        </div>

                        <button className="btn btn-warning">
                            Update Donor
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditDonor;