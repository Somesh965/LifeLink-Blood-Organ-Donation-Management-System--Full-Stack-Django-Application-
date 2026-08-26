import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBloodRequest } from "../../api/bloodRequestApi";

function AddBloodRequest() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        patient_name: "",
        patient_age: "",
        blood_group: "A+",
        units_required: "",
        hospital_name: "",
        hospital_address: "",
        city: "",
        state: "",
        reason: "",
        urgency: "Medium",
        required_date: "",
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

            await createBloodRequest(formData);

            alert("Blood Request Created Successfully");

            navigate("/bloodrequests");

        } catch (error) {

            console.error(error);

            alert("Failed to Create Blood Request");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">
                    <h3>Add Blood Request</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Patient Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="patient_name"
                                    value={formData.patient_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Patient Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="patient_age"
                                    value={formData.patient_age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Blood Group</label>
                                <select
                                    className="form-select"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleChange}
                                >
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Units Required</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="units_required"
                                    value={formData.units_required}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Hospital Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="hospital_name"
                                    value={formData.hospital_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Required Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="required_date"
                                    value={formData.required_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Hospital Address</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="hospital_address"
                                    value={formData.hospital_address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Reason</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Urgency</label>
                                <select
                                    className="form-select"
                                    name="urgency"
                                    value={formData.urgency}
                                    onChange={handleChange}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Blood Request
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default AddBloodRequest;