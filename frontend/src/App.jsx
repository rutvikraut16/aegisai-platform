import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {

    const token =
        localStorage.getItem(
            "token"
        );

    return (
        <>
            {
                token
                    ? <Dashboard />
                    : <Login />
            }

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </>
    );
}

export default App;