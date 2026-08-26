import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(formData);

            console.log(response.data);

            alert("Registration Successful!");

            navigate("/login");
        } catch (error) {
            console.error(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Registration Failed!"
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-header bg-danger text-white">
                            <h3 className="text-center">
                                Create Account
                            </h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>

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
                                        <label className="form-label">
                                            Phone Number
                                        </label>

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
                                        <label className="form-label">
                                            Role
                                        </label>

                                        <select
                                            className="form-select"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">
                                                Select Role
                                            </option>

                                            <option value="Donor">
                                                Donor
                                            </option>

                                            <option value="Recipient">
                                                Recipient
                                            </option>

                                            <option value="Hospital">
                                                Hospital
                                            </option>

                                            <option value="Blood Bank">
                                                Blood Bank
                                            </option>

                                            <option value="Admin">
                                                Admin
                                            </option>

                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 mt-3"
                                >
                                    Register
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;