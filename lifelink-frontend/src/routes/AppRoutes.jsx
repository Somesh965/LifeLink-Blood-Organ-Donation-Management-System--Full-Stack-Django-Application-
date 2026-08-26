import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DonorList from "../pages/Donors/DonorList";
import AddDonor from "../pages/Donors/AddDonor";
import ViewDonor from "../pages/Donors/ViewDonor";
import EditDonor from "../pages/Donors/EditDonor";
import BloodRequestList from "../pages/BloodRequests/BloodRequestList";
import AddBloodRequest from "../pages/BloodRequests/AddBloodRequest";
import ViewBloodRequest from "../pages/BloodRequests/ViewBloodRequest";
import EditBloodRequest from "../pages/BloodRequests/EditBloodRequest";
import BloodBankList from "../pages/BloodBanks/BloodBankList";
import AddBloodBank from "../pages/BloodBanks/AddBloodBank";
import ViewBloodBank from "../pages/BloodBanks/ViewBloodBank";
import EditBloodBank from "../pages/BloodBanks/EditBloodBank";
import HospitalList from "../pages/Hospitals/HospitalList";
import AddHospital from "../pages/Hospitals/AddHospital";
import ViewHospital from "../pages/Hospitals/ViewHospital";
import EditHospital from "../pages/Hospitals/EditHospital";
import DonationList from "../pages/Donations/DonationList";
import AddDonation from "../pages/Donations/AddDonation";
import ViewDonation from "../pages/Donations/ViewDonation";
import EditDonation from "../pages/Donations/EditDonation";
import OrganDonationList from "../pages/OrganDonations/OrganDonationList";
import AddOrganDonation from "../pages/OrganDonations/AddOrganDonation";
import ViewOrganDonation from "../pages/OrganDonations/ViewOrganDonation";
import EditOrganDonation from "../pages/OrganDonations/EditOrganDonation";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import ChangePassword from "../pages/Profile/ChangePassword";
import UploadPhoto from "../pages/Profile/UploadPhoto";
import RecipientList from "../pages/Recipients/RecipientList";
import AddRecipient from "../pages/Recipients/AddRecipient";
import ViewRecipient from "../pages/Recipients/ViewRecipient";
import EditRecipient from "../pages/Recipients/EditRecipient";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";
import ResetPwd from "../pages/ResetPwd/ResetPwd";

function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/reset-password" element={<ResetPwd />} />
            </Route>

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/donors" element={<DonorList />} />
                <Route path="/donors/add" element={<AddDonor />} />
                <Route path="/donors/:id" element={<ViewDonor />} />
                <Route path="/donors/edit/:id" element={<EditDonor />} />
                <Route path="/recipients" element={<RecipientList />} />
                <Route path="/recipients/add" element={<AddRecipient />} />
                <Route path="/recipients/:id" element={<ViewRecipient />} />
                <Route path="/recipients/edit/:id" element={<EditRecipient />} />
                <Route path="/bloodrequests" element={<BloodRequestList />} />
                <Route path="/bloodrequests/add" element={<AddBloodRequest />} />
                <Route path="/bloodrequests/:id" element={<ViewBloodRequest />} />
                <Route path="/bloodrequests/edit/:id" element={<EditBloodRequest />} />
                <Route path="/bloodbanks" element={<BloodBankList />} />
                <Route path="/bloodbanks/add" element={<AddBloodBank />} />
                <Route path="/bloodbanks/:id" element={<ViewBloodBank />} />
                <Route path="/bloodbanks/edit/:id" element={<EditBloodBank />} />
                <Route path="/hospitals" element={<HospitalList />} />
                <Route path="/hospitals/add" element={<AddHospital />} />
                <Route path="/hospitals/:id" element={<ViewHospital />} />
                <Route path="/hospitals/edit/:id" element={<EditHospital />} />
                <Route path="/donations" element={<DonationList />} />
                <Route path="/donations/add" element={<AddDonation />} />
                <Route path="/donations/:id" element={<ViewDonation />} />
                <Route path="/donations/edit/:id" element={<EditDonation />} />
                <Route path="/organdonations" element={<OrganDonationList />} />
                <Route path="/organdonations/add" element={<AddOrganDonation />} />
                <Route path="/organdonations/:id" element={<ViewOrganDonation />} />
                <Route path="/organdonations/edit/:id" element={<EditOrganDonation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/password" element={<ChangePassword />} />
                <Route path="/profile/photo" element={<UploadPhoto />} />



            </Route>

        </Routes>
    );
}

export default AppRoutes;