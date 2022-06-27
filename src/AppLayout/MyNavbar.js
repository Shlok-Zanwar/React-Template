import { Layout, Menu } from 'antd'
import React from 'react'
import { MenuFoldOutlined } from "@ant-design/icons";
import { Outlet } from 'react-router-dom';

export default function MyNavbar({ collapsed, onCollapse }) {
    return (
        <Layout>
            <Layout.Header>
                <div>
                    {
                        collapsed 
                        ? <></>
                        : <MenuFoldOutlined 
                            style={{marginLeft: '10px', fontSize: '20px'}} 
                            onClick={() => onCollapse(!collapsed)}
                        />
                    }
                </div>
            </Layout.Header>
            <Layout.Content className='main-content-div'>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}
