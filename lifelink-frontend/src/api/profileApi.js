import api from "./axios";

// View Profile
export const getProfile = () => {
    return api.get("accounts/profile/");
};

// Update Profile
export const updateProfile = (data) => {
    return api.put("accounts/profile/update/", data);
};

// Change Password
export const changePassword = (data) => {
    return api.post("accounts/changepassword/", data);
};

// Upload Profile Photo
export const uploadPhoto = (Data) => {
    return api.put("accounts/profile/photo/", Data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};