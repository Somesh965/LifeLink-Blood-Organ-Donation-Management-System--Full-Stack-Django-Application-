import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getOrganDonations,
    deleteOrganDonation,
} from "../../api/organDonationApi";

function OrganDonationList() {

    const [organDonations, setOrganDonations] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadOrganDonations();
    }, [search, currentPage]);

    const loadOrganDonations = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;

            const response = await getOrganDonations(params);

            if (Array.isArray(response.data.result)) {

                setOrganDonations(response.data.result);

            } else if (Array.isArray(response.data.results)) {

                setOrganDonations(response.data.results);

            } else if (Array.isArray(response.data)) {

                setOrganDonations(response.data);

            } else {

                setOrganDonations([]);

            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);

            setOrganDonations([]);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this Organ Donation?")) return;

        try {

            await deleteOrganDonation(id);

            alert("Organ Donation Deleted Successfully");

            loadOrganDonations();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Organ Donations</h2>

                <Link
                    to="/organdonations/add"
                    className="btn btn-primary"
                >
                    Add Organ Donation
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
                        <th>Organ</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {organDonations.length === 0 ? (

                        <tr>

                            <td colSpan="8" className="text-center">

                                No Organ Donations Found

                            </td>

                        </tr>

                    ) : (

                        organDonations.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.donor}</td>

                                <td>{item.recipient}</td>

                                <td>{item.hospital}</td>

                                <td>{item.organ_name}</td>

                                <td>{item.donation_date}</td>

                                <td>{item.status}</td>

                                <td>

                                    <Link
                                        to={`/organdonations/${item.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/organdonations/edit/${item.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
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

export default OrganDonationList;