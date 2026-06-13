import { useEffect, useState } from "react";
import axios from "axios";
import IncidentForm from "../components/IncidentForm";
import IncidentTable from "../components/IncidentTable";
import AnalyticsCharts from "../components/AnalyticsCharts";
import Sidebar from "../components/Sidebar";

function Dashboard() {


const [stats, setStats] = useState(null);

useEffect(() => {

    fetchAnalytics();

    const interval =
        setInterval(
            fetchAnalytics,
            10000
        );

    return () =>
        clearInterval(
            interval
        );

}, []);

const fetchAnalytics = async () => {

    try {
        console.log(import.meta.env.VITE_API_URL);
        const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/v1/analytics/overview`
);

        setStats(response.data);

    } catch (error) {

        console.error(
            "Analytics Error:",
            error
        );
    }
};

const refreshDashboard = () => {
    fetchAnalytics();
};

if (!stats) {

    return (
        <h2 className="text-center mt-5">
            Loading Dashboard...
        </h2>
    );
}

return (

    <div className="d-flex">

        <Sidebar />

        <div
    className="container-fluid p-4 dashboard-container"
    style={{
        minHeight:"100vh"
    }}
>

           <div
    id="dashboard"
    className="text-center mb-5"
>

                <h1
                    className="fw-bold"
                    style={{
                        fontSize: "3rem"
                    }}
                >
                    🚀 AegisAI Enterprise Dashboard
                </h1>

                <p
                    className="text-muted fs-5"
                >
                    AI-Powered Incident Intelligence Platform
                </p>

            </div>

           <div id="create-incident">

    <IncidentForm
        refreshDashboard={
            refreshDashboard
        }
    />

</div>

            <div className="row mb-4">

                <div className="col-lg-3 col-md-6 mb-3">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Incidents
                            </h6>

                            <h1
    className="fw-bold dashboard-title"
    style={{
        fontSize: "3rem"
    }}
>
                                {stats.total_incidents}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body">

                            <h6 className="text-muted">
                                🔥 Critical
                            </h6>

                            <h1
                                className="fw-bold text-danger"
                            >
                                {stats.critical_incidents}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body">

                            <h6 className="text-muted">
                                ⚠ High
                            </h6>

                            <h1
                                className="fw-bold text-warning"
                            >
                                {stats.high_incidents}
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-3">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <div className="card-body">

                            <h6 className="text-muted">
                                ✅ Low + Medium
                            </h6>

                            <h1
                                className="fw-bold text-success"
                            >
                                {(stats.low_incidents || 0) +
                                 (stats.medium_incidents || 0)}
                            </h1>

                        </div>

                    </div>

                </div>

            </div>

            <div id="analytics">

    <AnalyticsCharts
        stats={stats}
    />

</div>

           <div id="incidents">

    <IncidentTable />

</div>

        </div>

    </div>

);


}

export default Dashboard;
