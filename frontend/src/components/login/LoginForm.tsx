import { Form, Input, Typography } from "antd";
import { isRegisterAtom } from "../../states/loginState";
import { useSetRecoilState } from "recoil";

const { Link } = Typography;

const LoginForm: React.FC<LoginFormProps> = ({ form, disabled }) => {
	const setRegister = useSetRecoilState(isRegisterAtom);
	const handleClick = () => {
		setRegister(true);
	};

	return (
		<Form form={form} disabled={disabled}>
			<Form.Item label="Username" name="username" rules={[{ required: true }]}>
				<Input />
			</Form.Item>

			<Form.Item label="Password" name="password" rules={[{ required: true }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Link onClick={handleClick}>Register</Link>
			</Form.Item>
		</Form>
	);
};
export default LoginForm;
