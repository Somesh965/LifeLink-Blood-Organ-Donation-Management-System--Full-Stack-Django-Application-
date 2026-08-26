import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getHospital,
    updateHospital,
} from "../../api/hospitalApi";

function EditHospital() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        hospital_name: "",
        registration_number: "",
        hospital_type: "",
        contact_person: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        emergency_contact: "",
        status: "Active",
    });

    useEffect(() => {
        loadHospital();
    }, []);

    const loadHospital = async () => {

        try {

            const response = await getHospital(id);

            setFormData(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Hospital");

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

            await updateHospital(id, formData);

            alert("Hospital Updated Successfully");

            navigate("/hospitals");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">
                    <h3>Edit Hospital</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

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
                                <label>Registration Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="registration_number"
                                    value={formData.registration_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Hospital Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="hospital_type"
                                    value={formData.hospital_type}
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
                                <label>Emergency Contact</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="emergency_contact"
                                    value={formData.emergency_contact}
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
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Hospital
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/hospitals")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditHospital;