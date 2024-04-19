import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../styles/loginmodal";
import { isOpenAtom, isLoggedInAtom, isRegisterAtom } from "../../states/loginState";
import { Form } from "antd";
import { login, register } from "../../services/user";
import { currentUserAtom } from "../../states/userState";
import LoginForm from "./LoginForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

const LoginModal: React.FC = () => {
	const [isConfirmLoading, setConfirmLoading] = useState(false);
	const [isDisable, setDisable] = useState(false);

	const [isOpen, setOpen] = useRecoilState(isOpenAtom);
	const [isRegister, setRegister] = useRecoilState(isRegisterAtom);
	const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
	const setCurrentUser = useSetRecoilState(currentUserAtom);

	const [form] = Form.useForm();

	const handleCancle = () => {
		form.resetFields();
		setOpen(false);
		setRegister(false);
	};

	const handleOk = async () => {
		form.submit();

		setDisable(true);
		setConfirmLoading(true);

		const formValues = form.getFieldsValue();
		const user: UserRegisterBody | UserLoginBody = isRegister
			? { email: formValues.email, username: formValues.username, password: formValues.password }
			: { username: formValues.username, password: formValues.password };

		form.resetFields();

		try {
			const res = isRegister
				? await register(user as UserRegisterBody)
				: await login(user as UserLoginBody);

			setCurrentUser(res);
			setIsLoggedIn(true);
			setRegister(true);
		} catch (error) {
			console.error(error);
		}

		setDisable(false);
		setConfirmLoading(false);
		setOpen(false);
	};

	return (
		<Modal
			title="Login"
			open={isOpen}
			onOk={handleOk}
			confirmLoading={isConfirmLoading}
			onCancel={handleCancle}
			okText={"Login"}
		>
			{isRegister ? (
				<RegisterForm form={form} disabled={isDisable} />
			) : (
				<LoginForm form={form} disabled={isDisable} />
			)}
		</Modal>
	);
};

export default LoginModal;
