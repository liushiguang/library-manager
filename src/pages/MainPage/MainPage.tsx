import { Outlet, useNavigate } from "react-router-dom";
import home from "@/resources/Sidebar/home.svg"
import book from "@/resources/Sidebar/book.svg"
import reader from "@/resources/Sidebar/reader.svg"
import lend from "@/resources/Sidebar/lend.svg"
import notice from "@/resources/Sidebar/notice.svg"
import message from "@/resources/Sidebar/message.svg"

const Header = ()=> {
    return(
        /**
         * 导航栏的内容
         * 1. logo
         * 2. 文字
         */
        <div className="h-full flex items-center shadow-lg bg-blue-500 hover:bg-blue-600 transition duration-500">
            <span className="ml-20 text-white text-2xl font-bold font-sans">图书管理系统后台</span>
        </div>
    )
}

const Sidebar = () => {
    const navigate = useNavigate()
    return(
        <>
        {/* 
            侧边栏的内容
            1. 图书管理
            2. 读者管理
            3. 报表分析
            4. 借阅信息
            5. 发布公告
            6. 信箱
        */}

        <ul className="h-full flex flex-col font-san">
            <li className="basis-3"></li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/')}>
                <img src={home} className="w-8" />
                主页
                </button>
            </li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/bookManage')}>
                <img src={book} className="w-8" />
                图书管理
                </button>
            </li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/readerManage')}>
                <img src={reader} className="w-8" />
                读者管理
                </button>
            </li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/lendInfo')}>
                <img src={lend} className="w-8" />
                借阅管理
                </button>
            </li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/notice')}>
                <img src={notice} className="w-8" />
                发布公告
                </button>
            </li>
            <li className="basis-[10%] p-[6px]">
                <button className="w-full h-full flex justify-evenly items-center rounded-2xl btn glass border-2 bg-white/75 hover:scale-105" onClick={()=>navigate('/messageBox')}>
                <img src={message} className="w-8" />
                信箱
                </button>
            </li>
        </ul>
        </>
    )
}

const MainPage = ()=>{
    return (
        <div className="w-full h-[56rem] flex flex-col border-b-2">
            <div className="header basis-1/12">
                <Header/>
            </div>
            <div className="main w-full h-full basis-11/12 flex flex-row">
                <div className="sidebar w-full h-full basis-1/12">
                    <Sidebar />
                </div>
                <div className="content w-full h-full basis-11/12 bg-neutral-200/75">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPage;