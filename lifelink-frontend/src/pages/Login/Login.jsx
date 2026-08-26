import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { saveTokens } from "../../utils/token";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
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

        setLoading(true);

        try {

            const response = await loginUser(formData);
            console.log("FORM DATA:", formData);


            console.log("FULL RESPONSE:", response);
            console.log("DATA:", response.data);
            console.log("STATUS:", response.status);

            if (
                response.data.status &&
                response.data.tokens &&
                response.data.tokens.access &&
                response.data.tokens.refresh
            ) {

                saveTokens(
                    response.data.tokens.access,
                    response.data.tokens.refresh
                );

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert(response.data.message || "Login failed.");

            }

        } catch (error) {

            console.error(error);

            if (error.response) {

                console.log("ERROR RESPONSE:", error.response.data);

                alert(
                    error.response.data.message ||
                    "Invalid Username or Password"
                );

            } else {

                alert("Server is not responding.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow-lg border-0">

                        <div className="card-header bg-danger text-white text-center py-3">
                            <h3 className="mb-0">
                                LifeLink Login
                            </h3>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="text-end mb-3">

                                    <Link
                                        to="/forgot-password"
                                        className="text-danger text-decoration-none"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                            </form>

                            <hr />

                            <div className="text-center">

                                <span>Don't have an account?</span>

                                <Link
                                    to="/register"
                                    className="text-danger fw-bold text-decoration-none ms-2"
                                >
                                    Register
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;