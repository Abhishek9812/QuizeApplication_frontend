import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Card, Radio, Select, Col, Row, Checkbox,Layout } from 'antd';
import { toast } from 'react-toastify';
// import backendUrl from './BackendUrl';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const { TextArea } = Input;

const { Content } = Layout;


const CreateQuestion = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const cookie = new Cookies();

    useEffect(() => {
        let user = localStorage.getItem('userId');
        let token = cookie.get('token', { path: '/' })
        if (!user || !token) {
            localStorage.clear();
            cookie.remove('token');
            history.push('/login');
        }
    }, [])

    const onFinish = async (values) => {
        console.log('Question:', values);
        try {
            await axios.post(`/api/v1/createQuestion`, values, {
                headers: {
                    authorization: cookie.get('token', { path: '/' }),
                }
            }).then((res) => {
                console.log("Login Result:-> ", res);
                if (res.data.code === 206) {
                    toast.error(res.data.msg, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    toast.success(res.data.msg, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    form.resetFields();
                }
            }).catch((error) => {
                console.log("question error:-> ", error);
                toast.error(error, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                localStorage.clear();
                cookie.remove('token');
                history.push('/login');
            })

        } catch (error) {
            console.log(error);
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Layout>
                <Content className='content'>
                    <div className='container login_div'>
                        <Card hoverable title="Create Question"
                            style={{
                                marginTop: "100px",
                            }}
                        >
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item label="Title" name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Question!',
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item
                                    label="Option-1"
                                    name="option1"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your option-1!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option-2"
                                    name="option2"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your option-2!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option-3"
                                    name="option3"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your option-3!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Option-4"
                                    name="option4"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your option-4!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Difficulty Level" name='level'>
                                    <Select>
                                        <Select.Option value="1" >1</Select.Option>
                                        <Select.Option value="2">2</Select.Option>
                                        <Select.Option value="3" >3</Select.Option>
                                        <Select.Option value="4">4</Select.Option>
                                        <Select.Option value="5" >5</Select.Option>
                                        <Select.Option value="6">6</Select.Option>
                                        <Select.Option value="7" >7</Select.Option>
                                        <Select.Option value="8">8</Select.Option>
                                        <Select.Option value="9" >9</Select.Option>
                                        <Select.Option value="10">10</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name="checkbox-group" label="Correct Ans" name='correct'>
                                    <Checkbox.Group>
                                        <Row>
                                            <Col span={6}>
                                                <Checkbox value="option1" style={{ lineHeight: '32px' }}>
                                                    option-1
                                                </Checkbox>
                                            </Col>
                                            <Col span={6}>
                                                <Checkbox value="option2" style={{ lineHeight: '32px' }}>
                                                    option-2
                                                </Checkbox>
                                            </Col>
                                            <Col span={6}>
                                                <Checkbox value="option3" style={{ lineHeight: '32px' }}>
                                                    option-3
                                                </Checkbox>
                                            </Col>
                                            <Col span={6}>
                                                <Checkbox value="option4" style={{ lineHeight: '32px' }}>
                                                    option-4
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </>
    );
};
export default CreateQuestion;