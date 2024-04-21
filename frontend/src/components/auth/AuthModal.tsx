import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Divider, Modal } from "antd";
import { modalOpenAtom, modalTypeAtom } from "../../states/authModalState";
import { Form } from "antd";
import { login, register } from "../../services/user";
import { currentUserAtom } from "../../states/userState";
import { usePopupMessage } from "../../hooks/usePopupMessage";
import { toCapitalCase } from "../../helpers/data-format-utils";
import AuthForm from "./AuthForm";

import styled from "@emotion/styled";

const AuthModal: React.FC = () => {
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [isOpen, setOpen] = useRecoilState(modalOpenAtom);
  const [modalType, setModalType] = useRecoilState(modalTypeAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [form] = Form.useForm();
  const [messagePopup, contextHolder] = usePopupMessage();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setModalType("login");
  };

  const handleOk = async () => {
    form.submit();

    setDisable(true);
    setConfirmLoading(true);

    const formValues = form.getFieldsValue();
    const user: UserRegisterBody | UserLoginBody = {
      ...(modalType === "register" ? { email: formValues.email } : {}),
      username: formValues.username,
      password: formValues.password,
    };

    form.resetFields();

    try {
      const res =
        modalType === "register"
          ? await register(user as UserRegisterBody)
          : await login(user as UserLoginBody);

      messagePopup("success", `Welcome, ${res.username}!`);
      setCurrentUser(res);
      setDisable(false);
      setModalType("login");
      setConfirmLoading(false);
      setOpen(false);
    } catch (error) {
      messagePopup("error", "Invalid credentials. Please try again!");
      console.error(error);
      setDisable(false);
      setConfirmLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <>
            <StyledModalHeader>
              <img className="logo" src="/logo.svg" />
              <p className="title">{modalType.toUpperCase()}</p>
            </StyledModalHeader>
            <StyledDivider style={{ margin: "16px 0" }} />
          </>
        }
        open={isOpen}
        onOk={handleOk}
        confirmLoading={isConfirmLoading}
        onCancel={handleCancel}
        okText={toCapitalCase(modalType)}
      >
        <AuthForm form={form} disabled={isDisable} />
      </Modal>
    </>
  );
};

const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 28px;
    position: absolute;
  }

  .title {
    text-align: center;
    margin: 0 auto;
    font-weight: 700;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 16px 0;
`;

export default AuthModal;
