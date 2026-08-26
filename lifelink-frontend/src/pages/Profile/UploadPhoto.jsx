import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPhoto } from "../../api/profileApi";

function UploadPhoto() {

    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);

    const handleChange = (e) => {

        setPhoto(e.target.files[0]);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!photo) {

            alert("Please Select a Photo");

            return;

        }

        const formData = new FormData();

        formData.append("profile_image", photo);

        try {

            await uploadPhoto(formData);

            alert("Profile Photo Uploaded Successfully");

            navigate("/profile");

        } catch (error) {

            console.error(error);

            alert("Upload Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>Upload Profile Photo</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Select Photo</label>

                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Upload
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

export default UploadPhoto;