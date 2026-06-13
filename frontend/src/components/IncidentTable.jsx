import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function IncidentTable() {

    const [incidents, setIncidents] =
        useState([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    useEffect(() => {

        fetchIncidents();

    }, []);

    const fetchIncidents = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/incidents/`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setIncidents(
                response.data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    };

    const deleteIncident = async (id) => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/incidents/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            toast.success(
    "Incident Deleted"
);

            fetchIncidents();

        } catch (error) {

            console.error(error);

        }
    };
    const exportToCSV = () => {

    const headers = [
        "ID",
        "Title",
        "Category",
        "AI Severity",
        "Owner"
    ];

    const rows =
    filteredIncidents.map(
       
            (incident) => [
                incident.id,
                incident.title,
                incident.category,
                incident.ai_severity,
                incident.owner_id
            ]
        );

    const csvContent =
        [
            headers,
            ...rows
        ]
            .map(
                (row) =>
                    row.join(",")
            )
            .join("\n");

    const blob =
        new Blob(
            [csvContent],
            {
                type:
                "text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    link.href = url;

    link.download =
    "incidents.csv";

link.click();

toast.success(
    "CSV Exported Successfully"
);
};

    const filteredIncidents =
        incidents.filter(
            (incident) =>
                incident.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||
                incident.category
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
        );

    return (

        <div className="card p-4 shadow mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

    <h3>
        Incident List
    </h3>

    <button
        className="btn btn-success"
        onClick={exportToCSV}
    >
        📥 Export CSV
    </button>

</div>

            <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search by title or category..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }
                />

            </div>

            <table
                className="table table-striped table-hover"
            >

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Category</th>

                        <th>AI Severity</th>

                        <th>Owner</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        filteredIncidents.length > 0 ? (

                            filteredIncidents.map(
                                (incident) => (

                                    <tr
                                        key={
                                            incident.id
                                        }
                                    >

                                        <td>
                                            {
                                                incident.id
                                            }
                                        </td>

                                        <td>
                                            {
                                                incident.title
                                            }
                                        </td>

                                        <td>
                                            {
                                                incident.category
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    incident.ai_severity === "Critical"
                                                        ? "badge bg-danger"
                                                        : incident.ai_severity === "High"
                                                        ? "badge bg-warning text-dark"
                                                        : incident.ai_severity === "Medium"
                                                        ? "badge bg-primary"
                                                        : "badge bg-success"
                                                }
                                            >
                                                {
                                                    incident.ai_severity
                                                }
                                            </span>

                                        </td>

                                        <td>
                                            {
                                                incident.owner_id
                                            }
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {

                                                    if (
                                                        window.confirm(
                                                            "Are you sure you want to delete this incident?"
                                                        )
                                                    ) {

                                                        deleteIncident(
                                                            incident.id
                                                        );

                                                    }

                                                }}
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No Incidents Found
                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default IncidentTable;