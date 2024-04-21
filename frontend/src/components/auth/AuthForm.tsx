import { Form, Input, Typography } from "antd";
import { modalTypeAtom } from "../../states/authModalState";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

const { Link } = Typography;

const AuthForm: React.FC<AuthFormProps> = ({ form, disabled }) => {
  const [modalType, setModalType] = useRecoilState(modalTypeAtom);

  return (
    <StyledAuthForm
      form={form}
      disabled={disabled}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      {modalType === "register" && (
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email." }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password." }]}
      >
        <Input.Password />
      </Form.Item>

      {modalType === "login" ? (
        <p className="redirect-text">
          Not a user?
          <Link onClick={() => setModalType("register")}> Register here</Link>
        </p>
      ) : (
        <p className="redirect-text">
          Already registered?
          <Link onClick={() => setModalType("login")}> Log in here</Link>
        </p>
      )}
    </StyledAuthForm>
  );
};

const StyledAuthForm = styled(Form)`
  .redirect-text {
    text-align: center;
  }
`;

export default AuthForm;
