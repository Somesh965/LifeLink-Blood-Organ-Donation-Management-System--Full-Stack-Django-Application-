import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getProfile,
    updateProfile,
} from "../../api/profileApi";

function EditProfile() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        blood_group: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setFormData({
                first_name: response.data.first_name || "",
                last_name: response.data.last_name || "",
                email: response.data.email || "",
                phone_number: response.data.phone_number || "",
                gender: response.data.gender || "",
                date_of_birth: response.data.date_of_birth || "",
                blood_group: response.data.blood_group || "",
                address: response.data.address || "",
                city: response.data.city || "",
                state: response.data.state || "",
                pincode: response.data.pincode || "",
            });

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateProfile(formData);

            alert("Profile Updated Successfully");

            navigate("/profile");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Edit Profile</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>First Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Last Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
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
                                />
                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Gender</label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Date of Birth</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
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
                                    <option value="">Select</option>
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

                                <label>Pincode</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>Address</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
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
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Profile
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditProfile;