import axios from "axios";
import { useState } from "react"
import { announcement } from "@/type/announcement";
import moment from "moment";

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
            className='fixed top-[-35%] left-[26%] flex items-center justify-center bg-gray-800 bg-opacity-0'>
            {level === INFO_LEVEL && info_alert(msg)}
            {level === WARNING_LEVEL && warning_alert(msg)}
            {level === SUCCESS_LEVEL && success_alert(msg)}
            {level === ERROR_LEVEL && error_alert(msg)}
        </div>
    )
}

const Announcement = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [alertLevel, setAlertLevel] = useState(INFO_LEVEL)

    const handleTitleChange = (value: string) => {
        setTitle(value)
    }

    const handleContentChange = (value: string) => {
        setContent(value)
    }

    // 发布公告
    const publishAnnouncement = async () => {
        const publishTime = new Date()
        const formattedTime = moment(publishTime).format('YYYY-MM-DD HH:mm:ss')
        const editAnnouncement: announcement = {title: title, content: content, publish_time: formattedTime}
        const response = await axios.post('http://localhost:5000/announcements', editAnnouncement)
    
        // 发布成功
        if (response.data.code === 20031) {
            setShowAlert(true)
            setAlertMsg(response.data.msg)
            setAlertLevel(SUCCESS_LEVEL)

            setInterval(() => {
                setShowAlert(false)
            }, 5000)
        } 
        // 发布失败
        else if (response.data.code === 40031) {
            setShowAlert(true)
            setAlertMsg(response.data.msg)
            setAlertLevel(ERROR_LEVEL)
        
            setInterval(() => {
                setShowAlert(false)
            }, 5000)
        }
        
        setTitle('')
        setContent('')
    }
    // 重置公告
    const resetAnnouncement = () => {
        setTitle('')
        setContent('')
    }

    return (
        <div className="container w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 font-sans border border-gray-300 rounded-lg bg-white shadow-lg p-8">
            <div className="header font-semibold text-xl text-center mb-6">
                发布新公告
            </div>
            <div className="content">
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-lg font-medium">标题:</label>
                        <input 
                            type="text"
                            id="title"
                            name="title" 
                            value={title}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-200"
                            onChange={(e)=>handleTitleChange(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="content" className="text-lg font-medium">内容:</label>
                        <textarea 
                            placeholder="公告内容" 
                            id="content" 
                            name="content" 
                            value={content}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-indigo-200"
                            onChange={(e)=>handleContentChange(e.target.value)}></textarea>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="text-gray-600">这是一个很重要的公告，请仔细填写内容。</p>
                    </div>
                </div>
            </div>
            <div className="footer flex justify-center mt-6">
                <button 
                    onClick={publishAnnouncement}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:outline-none hover:ring hover:ring-blue-200 mr-4 text-lg">
                    发布
            </button>
                <button
                    onClick={resetAnnouncement} 
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:outline-none hover:ring hover:ring-gray-200 text-lg">
                    重置
                </button>
            </div>
            {
                showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
            }
        </div>
    )
}

export default Announcement;