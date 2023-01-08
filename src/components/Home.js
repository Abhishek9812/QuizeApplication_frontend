import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Button } from 'antd';
import axios from 'axios';
import Cookies from 'universal-cookie';
import backendUrl from './BackendUrl';
import { useHistory } from 'react-router-dom';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tags',
        dataIndex: 'level',
        render: (level) => {
            let tag = 'easy';
            console.log(level);
            if (level <= 5) {
                return <>
                    <Tag color='green' key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                </>
            }
            else if (level > 5 && level <= 8) {
                tag = 'medium';
                return <>
                    <Tag color='orange' key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                </>
            }
            else {
                tag = 'hard';
                return <>
                    <Tag color='red' key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                </>
            }
        }
    },
    {
        title: 'Link',
        key: 'link',
        render: () => (
            <Button type="primary">
                Show Link
            </Button>
        ),
    },
];

const Home = (props) => {
    const cookie = new Cookies();
    const history = useHistory();
    const [userData, setUserData] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        let user = localStorage.getItem('userId');
        let token = cookie.get('token', { path: '/' })
        if (!user || !token) {
            localStorage.clear();
            cookie.remove('token');
            history.push('/login');
            return;
        }
        if (props.userData)
            setUserData(props.userData);
        getAllQuizes();
    }, [props]);

    const getAllQuizes = async () => {
        try {
            await axios.get(`${backendUrl}/getAllQuize`, {
                headers: {
                    authorization: cookie.get('token', { path: '/' }),
                }
            }).then((res) => {
                if (res && res.data.code == 200) {
                    console.log(res.data);
                    setData(res.data.data);
                }
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
    return <>
        <Divider />
        <Table columns={columns} dataSource={data} />
    </>
}

export default Home;