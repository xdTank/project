import React, { FC, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd'
import { LoginPage } from './components/Login/login';
import { Provider } from 'react-redux';
import { initializeApp } from './store/reducers/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType, setupStore } from './store/store';
import { withSuspense } from './hoc/withSuspense';
import { Users } from './components/Users/Users';
import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Dialogs from './components/Dialogs/Dialogs';
import { selectIsAuth } from './store/selectors/authSelectors';
import { Header } from 'antd/es/layout/layout';
import DropdownMenu from './components/common/DropdownMenu/dropdownmenu';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAppSelector } from './hooks/redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'



const { Sider, Content } = Layout;


const Chat = lazy(() =>
  import('./pages/chat/chat')
    .then(({ Chat }) => ({ default: Chat })),
)
const ProfileContainer = lazy(() =>
  import('./components/Profile/ProfileContainer')
    .then(({ ProfileContainer }) => ({ default: ProfileContainer })),
)


const App: React.FC = () => {
  const initialiazed = useSelector((state: AppStateType) => state.app.initialiazed)
  const dispatch = useDispatch<any>()
  const [collapsed, setCollapsed] = useState(false)
  const isAuth = useAppSelector(state => state.authSlice.isAuth)


  const {
    token: { borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    dispatch(initializeApp())
  }, [initializeApp])

  if (!initialiazed) {
    return (
      <Preloader />)
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
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
              : <Link to={'/login'}>Login</Link>}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              backgroundColor: '#313338',
              padding: 24,
              borderRadius: borderRadiusLG,
            }}>
            <Routes>
              <Route path='/profile/:userId?' Component={withSuspense(ProfileContainer)} />
              <Route path='/dialogs' element={<Dialogs />} />
              <Route path='/chat' Component={withSuspense(Chat)} />
              <Route path='/users' element={<Users />} />
              <Route path='*' element={<div><h1>404 not found</h1></div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout >
    </div >
  )
}



const MainApp: FC = () => {
  const queryClient = new QueryClient
  const store = setupStore()
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryParamProvider adapter={ReactRouter6Adapter} >
          <QueryClientProvider client={queryClient}>
            <React.Suspense fallback={<Preloader />}>
              <App />
            </React.Suspense>
          </QueryClientProvider>
        </QueryParamProvider>
      </Provider>

    </BrowserRouter >
  )
}

export default MainApp



