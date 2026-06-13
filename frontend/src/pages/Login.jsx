import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const formData = new URLSearchParams();

            formData.append(
                "username",
                email
            );

            formData.append(
                "password",
                password
            );

            const response = await axios.post(
               "${import.meta.env.VITE_API_URL}/api/v1/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

           toast.success(
    "Login Successful"
);

window.location.reload();

            console.log(
                "JWT Token:",
                response.data.access_token
            );

        } catch (error) {

            console.error(
                "Login Error:",
                error.response?.data || error
            );

            toast.error(
    "Invalid Credentials"
);
        }
    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4"
                style={{
                    maxWidth: "500px",
                    margin: "auto"
                }}
            >

                <h2 className="text-center mb-4">
                    AegisAI Login
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;