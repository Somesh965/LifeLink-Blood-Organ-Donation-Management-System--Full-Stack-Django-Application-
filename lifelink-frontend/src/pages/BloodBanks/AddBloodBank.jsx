import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBloodBank } from "../../api/bloodBankApi";

function AddBloodBank() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        blood_bank_name: "",
        license_number: "",
        contact_person: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        blood_group: "A+",
        available_units: 0,
        status: "Open",
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

            await createBloodBank(formData);

            alert("Blood Bank Added Successfully");

            navigate("/bloodbanks");

        } catch (error) {

            console.error(error);

            alert("Failed to Add Blood Bank");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">
                    <h3>Add Blood Bank</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Blood Bank Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="blood_bank_name"
                                    value={formData.blood_bank_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>License Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="license_number"
                                    value={formData.license_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Contact Person</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="contact_person"
                                    value={formData.contact_person}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
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

                            <div className="col-md-12 mb-3">
                                <label>Address</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4 mb-3">
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

                            <div className="col-md-4 mb-3">
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

                            <div className="col-md-4 mb-3">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Available Units</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="available_units"
                                    value={formData.available_units}
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
                                    <option>Open</option>
                                    <option>Closed</option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Blood Bank
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddBloodBank;