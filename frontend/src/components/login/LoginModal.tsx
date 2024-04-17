import { useRecoilState, useSetRecoilState } from "recoil";
import { Modal } from "../../styles/loginmodal";
import { isModalOpenState, isModalConfirmLoadingState, isFormDisableState } from "../../states/loginState";
import { Form, Input } from "antd";
// import { login } from "../../services/user";
import { currentUserAtom } from "../../states/userState";

const LoginModal: React.FC = () => {
	const [isModalConfirmLoading, setModalConfirmLoadingState] = useRecoilState(isModalConfirmLoadingState);
	const [isFormDisable, setFormDisableState] = useRecoilState(isFormDisableState);
	const [isOpen, setOpenState] = useRecoilState(isModalOpenState);
	const [form] = Form.useForm();

	const setCurrentUserAtom = useSetRecoilState(currentUserAtom);

	const handleCancle = () => {
		form.resetFields();
		setOpenState(false);
	};

	const handleOk = async () => {
		form.submit();

		setFormDisableState(true);
		setModalConfirmLoadingState(true);

		const formValues = form.getFieldsValue();
		// const user: UserLoginBody = {
		// 	username: formValues.username,
		// 	password: formValues.password,
		// };

		const user: User = {
			_id: "",
			username: formValues.username,
			email: "",
			password: formValues.password,
			role: "customer",
		};

		form.resetFields();

		try {
			// const res = await login(user);
			setCurrentUserAtom({ ...user });
		} catch (error) {
			console.error(error);
		}

		setFormDisableState(false);
		setModalConfirmLoadingState(false);
	};

	return (
		<Modal title="Login" open={isOpen} onOk={handleOk} confirmLoading={isModalConfirmLoading} onCancel={handleCancle} okText={"Login"}>
			<Form form={form} disabled={isFormDisable}>
				<Form.Item label="Username" name="username" rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item label="Password" name="password" rules={[{ required: true }]}>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LoginModal;
