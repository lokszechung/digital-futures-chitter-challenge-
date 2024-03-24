import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomeView from "./views/HomeView/HomeView";

// import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPayload, isAuthenticated } from "./utils/auth";

function App() {
	const [authenticated, setAuthenticated] = useState(isAuthenticated());
	const [name, setName] = useState({});

	useEffect(() => {
		if (isAuthenticated()) {
			const { sub, firstname, lastname } = getPayload();
			setName({ sub, firstname, lastname });
		}
	}, [authenticated]);

	return (
		<>
			<Navbar
				authenticated={authenticated}
				setAuthenticated={setAuthenticated}
				name={name}
			/>
			<HomeView name={name} />
			{/* <Routes>
				<Route path="/" element={<HomeView name={name} />} />
			</Routes> */}
		</>
	);
}

export default App;
