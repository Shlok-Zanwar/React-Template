import Layout from 'antd/lib/layout/layout';
import React from 'react'
import MyNavbar from './MyNavbar';
import MySider from './MySider';

export default function AppLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <Layout hasSider >
            <MySider 
                collapsed={sidebarCollapsed}
                onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <Layout>
                <MyNavbar
                    collapsed={sidebarCollapsed}
                    onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </Layout>
        </Layout>
    )
}
