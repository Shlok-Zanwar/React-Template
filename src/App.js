import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, useLocation, Navigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Login from "./Auth/Login";
import { ar_loginUser, ar_logoutUser } from "./Redux/Actions/AuthActions";
import MyNavbar from "./AppLayout/MyNavbar";
import AppLayout from "./AppLayout/AppLayout";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaRegImages } from "react-icons/fa";
import { MdAccessTimeFilled, MdOutlineCompare } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdAllInclusive } from "react-icons/md";
import MyPortal from "./Components/MyPortal";


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
		dispatch(ar_loginUser({ isAuthenticated: true, user: {} }));  // Uncomment this line for testing
        setLoading(false);
	}
	
    useEffect(() => {
		validateToken();
    }, []);

	const menuItems = [
        {
            key: "dashboard",
            label: (
                <Link to={`/dashboard`}>
                    Dashboard
                </Link>
            ),
            icon: <AiFillHome />,

            search: "dashboard",
            pathname: `/dashboard`,
            name: "Dashboard",
        },
        {
            key: "images",
            label: "Images",
            icon: <FaRegImages />,
            children: [
                {
                    key: "images-hour",
                    label: (
                        <Link to={`/images/hour-wise`}>
                            Hour Wise
                        </Link>
                    ),
                    icon: <MdAccessTimeFilled />,

                    search: "hour wise hour-wise",
                    pathname: `/images/hour-wise`,
                    name: "Hour Wise",
                },
                {
                    key: "images-day",
                    label: (
                        <Link to={`/images/day-wise`}>
                            Day Wise
                        </Link>
                    ),
                    icon: <MdDateRange />,

                    search: "day wise day-wise",
                    pathname: `/images/day-wise`,
                    name: "Day Wise",
                },
                {
                    key: "images-custom",
                    label: (
                        <Link to={`/images/custom`}>
                            Custom
                        </Link>
                    ),
                    icon: <MdAllInclusive />,

                    search: "custom",
                    pathname: `/images/custom`,
                    name: "Custom",
                },
                {
                    key: "images-compare",
                    label: (
                        <Link to={`/images/compare`}>
                            Compare
                        </Link>
                    ),
                    icon: <MdOutlineCompare />,

                    search: "compare images",
                    pathname: `/images/compare`,
                    name: "Compare",
                },
            ],
        },
        {
            label: "Logout",
            key: "logout",
            name: "Logout",
            search: "logout",
            icon: <BiLogOut />,
            style: { marginTop: "5px" },
            onClick: () => {
                dispatch(ar_logoutUser());
            },
        },
    ];


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
									<AppLayout menuItems={menuItems} />
								</>
								: <Navigate 
									to="/login" 
									replace={true} 
									state={{ from: location.pathname }} 
								/>
					} 
				>

					{/* All Authenticated Routes here ............ */}
					<Route path="abc" element={
						<>
							<h1>/abc Page</h1>
							<MyPortal id="navbar-portal">ABC Page | Shlok OP</MyPortal>
						</>
					} />
					<Route path="*" element={<h1 style={{height: "100vh"}}>Home Page .... scroll inside</h1>} />
				</Route>

			</Routes>
		</div>
	)
}

export default App;
