import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Login() {
    const onFinish = values => {
        console.log("Received values of form: ", values);
        // axios.post("/login", {
        //     username: values.username,
        //     password: values.password,
        // })
        //     .then(res => {
        //         console.log(res.data);
        //         localStorage.setItem("token", res.data.token);
        //         window.location.href = "/";
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         message.error(err.response.data.message);
        //     });
    };

    return (
        <div className="login-outer-div">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                title="Login"
                
                // style={{ width: "500px" }}
            >
                <h1>Login </h1>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
    
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item> */}
    
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

