import {
PieChart,
Pie,
Cell,
Tooltip,
Legend,
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid
} from "recharts";

const COLORS = [
"#EF4444",
"#F59E0B",
"#3B82F6",
"#10B981"
];

function AnalyticsCharts({ stats }) {


const severityData = [
    {
        name: "Critical",
        value: stats.critical_incidents || 0
    },
    {
        name: "High",
        value: stats.high_incidents || 0
    },
    {
        name: "Medium",
        value: stats.medium_incidents || 0
    },
    {
        name: "Low",
        value: stats.low_incidents || 0
    }
];

return (

    <div className="row mt-5">

        <div className="col-lg-6 mb-4">

            <div
                className="card border-0 shadow-lg p-4"
                style={{
                    borderRadius: "25px"
                }}
            >

                <h4 className="text-center fw-bold mb-4">
                    📊 Severity Distribution
                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={400}
                >

                    <PieChart>

                        <Pie
    data={severityData}
    cx="50%"
    cy="50%"
    innerRadius={80}
    outerRadius={140}
    paddingAngle={5}
    dataKey="value"
    animationDuration={2500}
    labelLine={false}
    label={({ name, percent = 0 }) => {
        return `${name} ${(percent * 100).toFixed(0)}%`;
    }}
>

                            {severityData.map(
                                (_, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

        <div className="col-lg-6 mb-4">

            <div
                className="card border-0 shadow-lg p-4"
                style={{
                    borderRadius: "25px"
                }}
            >

                <h4 className="text-center fw-bold mb-4">
                    📈 Incident Statistics
                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={400}
                >

                    <BarChart
                        data={severityData}
                    >

                        <defs>

                            <linearGradient
                                id="colorBar"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#2563EB"
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#60A5FA"
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.3}
                        />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="value"
                            fill="url(#colorBar)"
                            radius={[
                                15,
                                15,
                                0,
                                0
                            ]}
                            animationDuration={3000}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>

);


}

export default AnalyticsCharts;
