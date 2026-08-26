import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getBloodBanks,
    deleteBloodBank,
} from "../../api/bloodBankApi";

function BloodBankList() {

    const [bloodBanks, setBloodBanks] = useState([]);

    const [search, setSearch] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadBloodBanks();
    }, [search, bloodGroup, status, currentPage]);

    const loadBloodBanks = async () => {

        try {

            const params = {
                page: currentPage,
            };

            if (search) params.search = search;
            if (bloodGroup) params.blood_group = bloodGroup;
            if (status) params.status = status;

            const response = await getBloodBanks(params);

            if (Array.isArray(response.data.result)) {
                setBloodBanks(response.data.result);
            } else if (Array.isArray(response.data.results)) {
                setBloodBanks(response.data.results);
            } else if (Array.isArray(response.data)) {
                setBloodBanks(response.data);
            } else {
                setBloodBanks([]);
            }

            setTotalPages(response.data.total_pages || 1);

        } catch (error) {

            console.error(error);

            setBloodBanks([]);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this Blood Bank?")) return;

        try {

            await deleteBloodBank(id);

            alert("Blood Bank Deleted Successfully");

            loadBloodBanks();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Blood Banks</h2>

                <Link
                    to="/bloodbanks/add"
                    className="btn btn-primary"
                >
                    Add Blood Bank
                </Link>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                    >
                        <option value="">All Blood Groups</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option>Open</option>
                        <option>Closed</option>
                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Blood Bank</th>
                        <th>Blood Group</th>
                        <th>Available Units</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {bloodBanks.length === 0 ? (

                        <tr>
                            <td colSpan="7" className="text-center">
                                No Blood Banks Found
                            </td>
                        </tr>

                    ) : (

                        bloodBanks.map((bank) => (

                            <tr key={bank.id}>

                                <td>{bank.id}</td>

                                <td>{bank.blood_bank_name}</td>

                                <td>{bank.blood_group}</td>

                                <td>{bank.available_units}</td>

                                <td>{bank.city}</td>

                                <td>{bank.status}</td>

                                <td>

                                    <Link
                                        to={`/bloodbanks/${bank.id}`}
                                        className="btn btn-info btn-sm me-2"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/bloodbanks/edit/${bank.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(bank.id)}
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

export default BloodBankList;