import { Form, Input, Typography } from "antd";
import { isRegisterAtom } from "../../states/loginState";
import { useSetRecoilState } from "recoil";

const { Link } = Typography;

const RegisterForm: React.FC<RegisterFormProps> = ({ form, disabled }) => {
	const setRegister = useSetRecoilState(isRegisterAtom);
	const handleClick = () => {
		setRegister(false);
	};

	return (
		<Form form={form} disabled={disabled}>
			<Form.Item label="Email" name="email" rules={[{ required: true }]}>
				<Input />
			</Form.Item>

			<Form.Item label="Username" name="username" rules={[{ required: true }]}>
				<Input />
			</Form.Item>

			<Form.Item label="Password" name="password" rules={[{ required: true }]}>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Link onClick={handleClick}>Login</Link>
			</Form.Item>
		</Form>
	);
};
export default RegisterForm;
