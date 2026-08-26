import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/profileApi";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
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

        if (formData.new_password !== formData.confirm_password) {

            alert("Passwords do not match");

            return;

        }

        try {

            await changePassword(formData);

            alert("Password Changed Successfully");

            navigate("/profile");

        } catch (error) {

            console.error(error);

            alert("Password Change Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Change Password</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Current Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                value={formData.old_password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>New Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Change Password
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

export default ChangePassword;