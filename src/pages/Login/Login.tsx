import './style.css'
import login_bg from '@/resources/Login/login_bg.jpg'
import qq from '@/resources/Login/QQ.png'
import wechat from '@/resources/Login/WeChat.png'
import axios from 'axios'
import { Administrator } from '@/type/administrator'
import { useState } from 'react'

const Login = () => {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

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
        const response = await axios.post('http://localhost:5000/administrators', administrator)

        // 获取响应码
        const resCode = response.data.code
        if (resCode === 20081) {
            console.log('登录成功')
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
        </div>
    )
}

export default Login;