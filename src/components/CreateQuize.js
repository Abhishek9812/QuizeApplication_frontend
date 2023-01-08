import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { Divider, Table, Button, Modal, Input, Form, Select } from 'antd';
import axios from 'axios';
import backendUrl from './BackendUrl';
import { useHistory } from 'react-router-dom';


const CreateQuize = () => {
    const cookie = new Cookies();
    const [questions, setQuestions] = useState();
    const [data, setData] = useState();
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useHistory();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Questions',
            dataIndex: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Option-1',
            dataIndex: 'option1',
        },
        {
            title: 'Option-2',
            dataIndex: 'option2',
        },
        {
            title: 'Option-3',
            dataIndex: 'option3',
        },
        {
            title: 'Option-4',
            dataIndex: 'option4',
        },
        {
            title: 'Level',
            dataIndex: 'level',
        },
        {
            title: 'Correct',
            dataIndex: 'correct',
            render: (arr) => {
                let str = '';
                for (let i = 0; i < arr.length; i++) {
                    str += arr[i];
                    str += ', ';
                }
                return str;
            },
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setQuestions(selectedRows);
        },
    };

    useEffect(() => {
        let user = localStorage.getItem('userId');
        let token = cookie.get('token', { path: '/' })
        if (!user || !token) {
            localStorage.clear();
            cookie.remove('token');
            history.push('/login');
            return;
        }
        getQuestions();
    }, [])

    useEffect(() => {


    }, [])

    const getQuestions = async () => {
        try {
            await axios.get(`${backendUrl}/getAllQuestions`, {
                headers: {
                    authorization: cookie.get('token', { path: '/' }),
                }
            }).then((res) => {
                if (res && res.data.code == 200) {
                    console.log(res.data.data[0]['_id']);
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i]["key"] = res.data.data[i]['_id'];
                    }
                    setQuestions(res.data.data);
                    setData(res.data.data);
                } else {
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                // console.log("Questions aa gye :->", res);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = async (values) => {
        let userId = localStorage.getItem('userId');
        console.log("userId ===", userId);
        if (questions.length != 10 || !userId) {
            toast.error("Please upload exactly 10 questions", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        let data = {
            questions,
            title: values.title,
            level: values.level,
            userId
        }
        console.log("quizeData :-> ", data);
        try {
            await axios.post(`${backendUrl}/createQuize`, data, {
                headers: {
                    authorization: cookie.get('token', { path: '/' }),
                }
            }).then((res) => {
                if (res && res.data && res.data.data) {
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
                    handleCancel();

                    history.push('/');
                } else {
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
                }
                console.log("Quize ban gya:-> ", res.data);
            }).catch((err) => {
                console.log(err);
                localStorage.clear();
                cookie.remove('token');
                history.push('/login');
            })

        } catch (error) {
            console.log(error);
            localStorage.clear();
            cookie.remove('token');
            history.push('/login');
        }
    }

    return (
        <div>
            <Divider />
            <Button type="primary" onClick={showModal}>
                Create Quize
            </Button>
            <Modal title="Create Quize" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form
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
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
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

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};
export default CreateQuize;