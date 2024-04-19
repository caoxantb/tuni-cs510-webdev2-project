import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Menu, MenuItem } from "../styles/navbar";
import { isLoggedInAtom, isOpenAtom } from "../states/loginState";
import { Button } from "../styles/loginmodal";
import { currentUserAtom, currentUserSelector } from "../states/userState";
import { useEffect } from "react";
import { logout } from "../services/user";

const NavBar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
	const [, setOpen] = useRecoilState(isOpenAtom);
	const setCurrentUser = useSetRecoilState(currentUserAtom);
	const currentUser = useRecoilValueLoadable(currentUserSelector);

	useEffect(() => {
		if (currentUser.state === "hasValue") {
			if (currentUser.contents == null) {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		}
	}, [currentUser, setIsLoggedIn]);

	const showModal = () => {
		setOpen(true);
		// console.log(currentUser);
	};

	const handleLogout = async () => {
		await logout();
		setCurrentUser(null);
		// console.log(currentUser);
		setIsLoggedIn(false);
	};

	return (
		<Menu mode="horizontal" theme="light">
			<MenuItem key="home">Home</MenuItem>
			<MenuItem key="about">About</MenuItem>
			<MenuItem key="contact">Contact</MenuItem>

			<MenuItem key="login" style={{ marginLeft: "auto" }}>
				{isLoggedIn ? (
					<Button onClick={handleLogout}>Logout</Button>
				) : (
					<Button onClick={showModal}>Login</Button>
				)}
			</MenuItem>
		</Menu>
	);
};

export default NavBar;
