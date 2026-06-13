import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function IncidentForm({ refreshDashboard }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("High");

    const createIncident = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/incidents/`,
                {
                    title,
                    description,
                    severity
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

           toast.success(
    "Incident Created Successfully"
);

            setTitle("");
            setDescription("");
            setSeverity("High");

            refreshDashboard();

        } catch (error) {

            console.error(error);

            alert(
                "Failed To Create Incident"
            );
        }
    };

    return (

        <div className="card p-4 shadow mb-4">

            <h3>Create Incident</h3>

            <form onSubmit={createIncident}>

                <div className="mb-3">

                    <label>Title</label>

                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                </div>

                <div className="mb-3">

                    <label>Description</label>

                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                </div>

                <div className="mb-3">

                    <label>Severity</label>

                    <select
                        className="form-control"
                        value={severity}
                        onChange={(e) =>
                            setSeverity(e.target.value)
                        }
                    >

                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>

                    </select>

                </div>

                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Create Incident
                </button>

            </form>

        </div>
    );
}

export default IncidentForm;