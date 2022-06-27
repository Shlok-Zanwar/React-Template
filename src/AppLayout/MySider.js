import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("Team", "sub1", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
    getItem("Files", "9", <FileOutlined />),
];

export default function MySider({ collapsed, onCollapse }) {
    return (
        <Layout.Sider 
            // style={{ background: "red", height: "100vh", overflow: 'auto' }} 
            className="sidebar-component"
            width={'var(--sidebarOpenWidth)'} 
            collapsedWidth={'var(--sidebarClosedWidth)'}
            collapsed={collapsed} 
            onCollapse={onCollapse}
            // collapsible={true}
        >
            <div className="sidebar-top-logo">
                {
                    collapsed 
                    ? <MenuUnfoldOutlined 
                        style={{marginLeft: '10px', fontSize: '20px'}} 
                        onClick={() => onCollapse(!collapsed)}
                    />
                    : <>Sidebar Header</>
                }
            </div>
            <div className="sidebar-content">
                <Menu 
                    theme="dark"
                    defaultSelectedKeys={["1"]} 
                    mode="inline" 
                    items={items} 
                />
            </div>
            <div className="sidebar-footer">
                Sidebar
            </div>
        </Layout.Sider>
    );
}
