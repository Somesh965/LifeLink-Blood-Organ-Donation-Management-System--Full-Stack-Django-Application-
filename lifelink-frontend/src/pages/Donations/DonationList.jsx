import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getDonations,
    deleteDonation,
} from "../../api/donationApi";

function DonationList() {

    const [donations, setDonations] = useState([]);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadDonations();
    }, [search, currentPage]);

    const loadDonations = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;

            const response = await getDonations(params);

            if (Array.isArray(response.data.result)) {
                setDonations(response.data.result);
            } else if (Array.isArray(response.data.results)) {
                setDonations(response.data.results);
            } else if (Array.isArray(response.data)) {
                setDonations(response.data);
            } else {
                setDonations([]);
            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);
            setDonations([]);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this Donation?")) return;

        try {

            await deleteDonation(id);

            alert("Donation Deleted Successfully");

            loadDonations();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Donations</h2>

                <Link
                    to="/donations/add"
                    className="btn btn-primary"
                >
                    Add Donation
                </Link>

            </div>

            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Donor</th>
                        <th>Recipient</th>
                        <th>Hospital</th>
                        <th>Blood Group</th>
                        <th>Units</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {donations.length === 0 ? (

                        <tr>
                            <td colSpan="9" className="text-center">
                                No Donations Found
                            </td>
                        </tr>

                    ) : (

                        donations.map((donation) => (

                            <tr key={donation.id}>

                                <td>{donation.id}</td>

                                <td>{donation.donor}</td>

                                <td>{donation.recipient}</td>

                                <td>{donation.hospital}</td>

                                <td>{donation.blood_group}</td>

                                <td>{donation.units_donated}</td>

                                <td>{donation.donation_date}</td>

                                <td>{donation.donation_status}</td>

                                <td>

                                    <Link
                                        to={`/donations/${donation.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/donations/edit/${donation.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(donation.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            <div className="d-flex justify-content-center mt-3">

                <button
                    className="btn btn-secondary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-secondary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>

            </div>

        </div>

    );

}

export default DonationList;