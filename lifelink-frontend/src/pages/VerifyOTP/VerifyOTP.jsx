import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../api/authApi";

function VerifyOTP() {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await verifyOTP({
                email,
                otp,
            });

            alert(response.data.message);

            navigate("/reset-password", {
                state: {
                    email,
                    otp,
                },
            });

        } catch (error) {

            console.error(error);

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
                            <h3>Verify OTP</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Enter OTP
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default VerifyOTP;