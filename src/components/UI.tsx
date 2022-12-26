import React, { useState } from "react";
import "./UI.css";
import "./table.tsx";
import {
    ShoppingOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Sider } = Layout;


const items1: MenuProps["items"] = ["login", "register", "cart", "reports"].map((key) => ({
    key,
    label: `${key}`
}));



const UI: React.FC = () => {

    const [catergories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    React.useEffect(() => { fetch("http://localhost:8080/categories", { method: "GET" }).then(res => res.json()).then(res => setCategories(res)) }, [])
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const items2: MenuProps["items"] = [
        ShoppingOutlined
    ].map((icon, index) => {
        const key = String(2);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `categories`,

            children: catergories.map((c: any) => ({ key: c.ID, label: c.category_name,      }))
            // [{
            //     key: "Mobile phones",
            //     label: `Mobile phones`
            // }, ...new Array(5).fill(null).map((_, j) => {
            //     const subKey = index * 4 + j + 1;
            //     return {
            //         key: subKey,
            //         label: `option${subKey}`
            //     };
            // })]
        };
    });

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={items1}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                        items={items2}
                    />

                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer
                        }}
                    >
                        <table />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UI;