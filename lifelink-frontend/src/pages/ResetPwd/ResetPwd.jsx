import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authApi";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";
    const otp = location.state?.otp || "";

    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            const response = await resetPassword({
                email,
                otp,
                new_password: formData.new_password,
                confirm_password: formData.confirm_password,
            });

            alert(response.data.message);
            navigate("/login");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Server Error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header bg-danger text-white text-center">
                            <h3>Reset Password</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        name="new_password"
                                        className="form-control"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        placeholder="Enter New Password"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className="form-control"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Reset Password"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;