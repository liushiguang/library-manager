import './style.css'
import login_bg from '@/resources/Login/login_bg.jpg'
import qq from '@/resources/Login/QQ.png'
import wechat from '@/resources/Login/WeChat.png'
import axios from 'axios'
import { Administrator } from '@/type/administrator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 自定义提示等级
const INFO_LEVEL = 2001
const WARNING_LEVEL = 2002
const SUCCESS_LEVEL = 2003
const ERROR_LEVEL = 2004

// 自定义弹窗提示框
const CustomAlert = (props: any) => {
    const {msg, level} = props
    
    const info_alert = (msg: string) => {
        return (
            <div role="alert" className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Info: {msg}</span>
            </div>
        )
    }

    const warning_alert = (msg: string) => {
        return (
            <div role="alert" className="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Warning: {msg}</span>
            </div>
        )
    }
    
    const success_alert = (msg: string) => {
        return (
            <div role="alert" className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Success! {msg}</span>
            </div>
        )
    }

    const error_alert = (msg: string) => {
        return (
            <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error! {msg}</span>
            </div>
        )   
    }

    return (
        <div 
            className='fixed top-[10%] left-[45%] flex items-center justify-center bg-gray-800 bg-opacity-0'>
            {level === INFO_LEVEL && info_alert(msg)}
            {level === WARNING_LEVEL && warning_alert(msg)}
            {level === SUCCESS_LEVEL && success_alert(msg)}
            {level === ERROR_LEVEL && error_alert(msg)}
        </div>
    )
}

const Login = () => {
    const navigate = useNavigate()

    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [alertLevel, setAlertLevel] = useState(INFO_LEVEL)
    const [showAlert, setShowAlert] = useState(false)

    const handleAccountChange = (value: string) => {
        setAccount(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    // 处理登录逻辑
    const handleLogin = async () => {

        // 封装登录信息
        const administrator: Administrator = {
            admin_id: 0,
            admin_account: account,
            admin_name: '',
            admin_password: password,
            gender: '',
            phone: ''
        }

        // 发送登录请求
        const response = await axios.post('http://localhost:5000/administrators/account', administrator)

        // 获取响应码
        const resCode = response.data.code
        if (resCode === 200101) {
            console.log('登录成功')

            // 获取路由对象
            
            // 跳转到主页
            navigate('/')
        }
        else {
            console.log('登录失败')
            setAlertMsg(response.data.msg)
            setAlertLevel(ERROR_LEVEL)

            setShowAlert(true)
            setInterval(() => {
                setShowAlert(false)
            }, 3000)
        }
    }

    return (
        <div
            className="box">
            <div
                style={{backgroundImage: `url(${login_bg})`}} 
                className="content bg-no-repeat">
                <div className="login-wrapper">
                    <h1>登录</h1>
                    <div className="login-form">
                        <div className="username form-item">
                            <span>使用账号、手机号</span>
                            <input 
                                type="text"
                                name='account'
                                value={account} 
                                onChange={(e)=>handleAccountChange(e.target.value)}
                                className="input-item focus:ring focus:ring-violet-400" />
                        </div>
                        <div className="password form-item">
                            <span>密码</span>
                            <input 
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e)=>handlePasswordChange(e.target.value)}
                                className="input-item focus:ring focus:ring-violet-400" />
                        </div>
                        <button 
                            onClick={handleLogin}
                            className="login-btn">
                            登 录
                        </button>
                    </div>
                    <div className="divider">
                        <span className="line"></span>
                        <span className="divider-text">其他方式登录</span>
                        <span className="line"></span>
                    </div>
                    <div className="other-login-wrapper">
                        <div className="other-login-item">
                            <img src={qq} alt="" />
                        </div>
                        <div className="other-login-item">
                            <img src={wechat} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {
                showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
            }
        </div>
    )
}

export default Login;