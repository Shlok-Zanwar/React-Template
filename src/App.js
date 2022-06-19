import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./Auth/Login";
import { ar_loginUser } from "./Redux/Actions/AuthActions";
import MyNavbar from "./Navbar/MyNavbar";


function App() {
    const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const authReducer = useSelector(state => state.authReducer);
	let location = useLocation();

	const validateToken = () => {
		setLoading(true);
        if (localStorage.token) {
            const token = localStorage.getItem("token");
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (currentTime <= decoded.exp) {
				const data = {
                    isAuthenticated: true,
					user: {
						userId: decoded.userid,
						username: decoded.username,
					},
                };
                dispatch(ar_loginUser(data));
            }
        }
        setLoading(false);
	}
	
    useEffect(() => {
		validateToken();
    }, []);

    return (
		<div className="App">
			<Routes>
				<Route path="/login" element={<Login />} >
					<Route path="/login/aa" element={<MyNavbar />} />
				</Route>
		
				{/* 
					Validate the token first.
					Till the token is being validated, show the loading screen.
					After that loading will be false, hence check if the validation is successful or not.
					If successful, then move forward.
					Else, naviate to the login page.
				*/}
				<Route 
					path="*" 
					element={
						loading ? <div>Loading...</div> 
							: authReducer.isAuthenticated 
								? 
								<>
									<MyNavbar /> 
									<Outlet />
								</>
								: <Navigate 
									to="/login" 
									replace={true} 
									state={{ from: location.pathname }} 
								/>
					} 
				>

					{/* All Authenticated Routes here ............ */}
					<Route path="abc" element={<h1>Hii1</h1>} />
				</Route>

			</Routes>
		</div>
	)
}

export default App;
