import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../api/profileApi";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setProfile(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Profile");

        }

    };

    if (!profile) {

        return (
            <h4 className="text-center mt-5">
                Loading...
            </h4>
        );

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h3>My Profile</h3>

                </div>

                <div className="card-body">

                    <div className="text-center mb-4">

                        <img
                            src={
                                profile.profile_image
                                ? profile.profile_image
                                :"https://via.placeholder.com/150"
                            }
                            alt="Profile"
                            className="rounded-circle border"
                        />

                    </div>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Username</th>
                                <td>{profile.username}</td>
                            </tr>

                            <tr>
                                <th>First Name</th>
                                <td>{profile.first_name}</td>
                            </tr>

                            <tr>
                                <th>Last Name</th>
                                <td>{profile.last_name}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{profile.email}</td>
                            </tr>

                            <tr>
                                <th>Phone Number</th>
                                <td>{profile.phone_number}</td>
                            </tr>

                            <tr>
                                <th>Role</th>
                                <td>{profile.role}</td>
                            </tr>

                            <tr>
                                <th>Gender</th>
                                <td>{profile.gender}</td>
                            </tr>

                            <tr>
                                <th>Date of Birth</th>
                                <td>{profile.date_of_birth}</td>
                            </tr>

                            <tr>
                                <th>Blood Group</th>
                                <td>{profile.blood_group}</td>
                            </tr>

                            <tr>
                                <th>Address</th>
                                <td>{profile.address}</td>
                            </tr>

                            <tr>
                                <th>City</th>
                                <td>{profile.city}</td>
                            </tr>

                            <tr>
                                <th>State</th>
                                <td>{profile.state}</td>
                            </tr>

                            <tr>
                                <th>Pincode</th>
                                <td>{profile.pincode}</td>
                            </tr>

                        </tbody>

                    </table>

                    <Link
                        to="/profile/edit"
                        className="btn btn-primary me-2"
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to="/profile/password"
                        className="btn btn-warning me-2"
                    >
                        Change Password
                    </Link>

                    <Link
                        to="/profile/photo"
                        className="btn btn-success"
                    >
                        Upload Photo
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Profile;