import { useState, useEffect } from "react";

function Sidebar() {

    const [darkMode, setDarkMode] =
        useState(false);

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                "theme"
            );

        if (savedTheme === "dark") {

            setDarkMode(true);

            document.body.classList.add(
                "dark-mode"
            );
        }

    }, []);

    const toggleTheme = () => {

        const newTheme =
            !darkMode;

        setDarkMode(newTheme);

        if (newTheme) {

            document.body.classList.add(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            document.body.classList.remove(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                "light"
            );
        }
    };

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        window.location.reload();
    };

    return (

        <div
            className="bg-dark text-white p-4 shadow-lg"
            style={{
                minHeight: "100vh",
                width: "250px"
            }}
        >

            <h2
                className="mb-5 fw-bold"
            >
                🛡 AegisAI
            </h2>

            <ul
                className="list-unstyled"
            >

               <li
    className="mb-4"
    style={{ cursor: "pointer" }}
    onClick={() =>
        document
            .getElementById("dashboard")
            ?.scrollIntoView({
                behavior: "smooth"
            })
    }
>
    📊 Dashboard
</li>

<li
    className="mb-4"
    style={{ cursor: "pointer" }}
    onClick={() =>
        document
            .getElementById("incidents")
            ?.scrollIntoView({
                behavior: "smooth"
            })
    }
>
    🚨 Incidents
</li>

<li
    className="mb-4"
    style={{ cursor: "pointer" }}
    onClick={() =>
        document
            .getElementById("analytics")
            ?.scrollIntoView({
                behavior: "smooth"
            })
    }
>
    🤖 AI Insights
</li>

<li
    className="mb-4"
    style={{ cursor: "pointer" }}
    onClick={() =>
        document
            .getElementById("create-incident")
            ?.scrollIntoView({
                behavior: "smooth"
            })
    }
>
    ⚙ Create Incident
</li>

                <li
                    className="mb-4"
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={
                        toggleTheme
                    }
                >

                    {
                        darkMode
                            ? "☀ Light Mode"
                            : "🌙 Dark Mode"
                    }

                </li>

                <li
                    className="mt-5 text-danger fw-bold"
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={
                        handleLogout
                    }
                >
                    🚪 Logout
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;