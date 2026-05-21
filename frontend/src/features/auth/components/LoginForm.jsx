import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function LoginForm() {
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials((credentials) => ({ ...credentials, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.identifier.trim() || !credentials.password.trim()) {
            return alert("All fields are required");
        }
        await login(credentials);
        setCredentials({
            identifier: "",
            password: "",
        });
    };

    const isLoading = (
        <div className="uppercase font-bold text-sm letter tracking-widest mx-auto my-auto bg-gradient-to-r from-blue-300 via-blue-600 to-red-500 bg-clip-text text-transparent">
            Loading...
        </div>
    );

    return (
        <div className="w-screen h-max-screen h-full overflow-x-auto flex flex-col items-center p-2">
            {!loading ? (
                <>
                    <h1 className="m-5 font-medium">Login Form</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2 shadow-md p-10 rounded-md"
                    >
                        <label htmlFor="identifier " className="flex flex-col">
                            Username or Email:
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={credentials.identifier}
                                onChange={handleInput}
                                className="rounded-md w-full p-2 border border-blue-600 placeholder:text-blue-300 focus:outline-blue-600"
                                placeholder="John Doe"
                            />
                        </label>
                        <label htmlFor="passowrd" className="flex flex-col">
                            Password:
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInput}
                                className="rounded-md w-full p-2 border border-blue-600 placeholder:text-blue-300 focus:outline-blue-600"
                                placeholder="••••"
                            />
                        </label>
                        <button className="text-white bg-blue-600">
                            Submit
                        </button>
                    </form>
                    <p className="m-2">
                        Not a user?{" "}
                        <Link to="/register">
                            <span className=" font-medium hover:text-blue-400 active:text-blue-800">
                                Create Account
                            </span>{" "}
                        </Link>
                    </p>{" "}
                </>
            ) : (
                isLoading
            )}
        </div>
    );
}
