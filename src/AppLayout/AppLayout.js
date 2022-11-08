import Layout from 'antd/lib/layout/layout';
import React from 'react'
import MyNavbar from './MyNavbar';
import MySider from './MySider';

export default function AppLayout({menuItems, globalSearchItems}) {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <Layout hasSider >
            <MySider 
                collapsed={sidebarCollapsed}
                onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                menuItems={menuItems}
            />
            <Layout>
                <MyNavbar
                    collapsed={sidebarCollapsed}
                    setCollapse={setSidebarCollapsed}
                    globalSearchItems={globalSearchItems}
                />
            </Layout>
        </Layout>
    )
}
