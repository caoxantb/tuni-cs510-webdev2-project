import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Menu, MenuItem } from "../styles/navbar";
import { isLoggedInState, isModalOpenState } from "../states/loginState";
import { Button } from "../styles/loginmodal";
import { currentUserSelector } from "../states/userState";
import { useEffect } from "react";

const NavBar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
	const [, setOpenState] = useRecoilState(isModalOpenState);
	const currentUser = useRecoilValueLoadable(currentUserSelector);

	useEffect(() => {
		if (currentUser.state === "hasValue" && currentUser.contents !== null) {
			setIsLoggedIn(true);
		}
	}, [currentUser, setIsLoggedIn]);

	const showModal = () => {
		console.log(currentUser.contents.toString());
		setOpenState(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	return (
		<Menu mode="horizontal" theme="light">
			<MenuItem key="home">Home</MenuItem>
			<MenuItem key="about">About</MenuItem>
			<MenuItem key="contact">Contact</MenuItem>

			<MenuItem key="login" style={{ marginLeft: "auto" }}>
				{isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : <Button onClick={showModal}>Login</Button>}
			</MenuItem>
		</Menu>
	);
};

export default NavBar;
