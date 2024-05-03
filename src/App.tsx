import React, { FC, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, createBrowserRouter } from 'react-router-dom';
import './App.css';
import 'antd'
import { LoginPage } from './components/Login/login';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { Users } from './pages/users/Users';
import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Spin, theme } from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import { Header } from 'antd/es/layout/layout';
import DropdownMenu from './components/common/DropdownMenu/dropdownmenu';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from './hooks/redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/chat';
import { NextUIProvider } from "@nextui-org/react";
import path from 'path';

const { Sider, Content } = Layout;





const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const isAuth = useAppSelector(state => state.auth.isAuth)


  const {
    token: { borderRadiusLG },
  } = theme.useToken()


  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/project' element={<LoginPage />} />
      </Routes>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }} >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              backgroundColor: '#1E1F22',
              height: '100%',
              fontSize: '18px',

            }}
            theme="dark"
            mode="inline"
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: <Link to="/profile" >Profile</Link>,
              },
              {
                key: '2',
                icon: <MessageOutlined />,
                label: <Link to="/dialogs">Messages</Link>,
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: <Link to="/users">Users</Link>,
              },
              {
                key: '4',
                icon: <MessageOutlined />,
                label: <Link to="/chat">Chat</Link>,
              },
            ]}
          />
        </Sider>
        <Layout style={{
          backgroundColor: '#2B2D31',
        }
        }>
          <Header style={{ padding: 0, backgroundColor: '#313338', display: 'flex', justifyContent: 'space-between', }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            {isAuth
              ? <DropdownMenu />
              : <Link style={{ paddingRight: '10px' }} to={'/login'}>Login</Link>}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              backgroundColor: '#313338',
              padding: 24,
              borderRadius: borderRadiusLG,
            }}>
            <Routes>
              <Route path='/' element={<Profile />} />
              <Route path='/profile/:userId?' element={<Profile />} />
              <Route path='/dialogs' element={<Dialogs />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/users' element={<Users />} />
              <Route path='*' element={<div><h1>404 not found</h1></div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout >
    </div >
  )
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: '',
    children: [
      {
        path: '/',
        element: <Profile />,
      },
      {
        path: '/profile/:userId?',
        element: <Profile />,
      },
      {
        path: '/dialogs',
        element: <Dialogs />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '*',
        element: <div><h1>404 not found</h1></div>,
      }
    ]
  }
])

const MainApp: FC = () => {
  const queryClient = new QueryClient()
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryParamProvider adapter={ReactRouter6Adapter} >
                <React.Suspense fallback={<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}>
                  <NextUIProvider>
                    <App />
                  </NextUIProvider>
                  <ReduxToastr
                    newestOnTop={false}
                    preventDuplicates
                    progressBar
                    closeOnToastrClick
                    timeOut={4000}
                    transitionIn="fadeIn"
                    transitionOut='fadeOut'
                  />
                </React.Suspense>
              </QueryParamProvider>
            </PersistGate>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter >
    </>
  )
}

export default MainApp



