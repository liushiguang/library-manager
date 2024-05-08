import { Outlet,useNavigate } from "react-router-dom";

const Header = ()=> {
    return(
        <div>
        {/* 
            导航栏的内容
            1. logo
            2. 
        */}
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
        */}

        <ul>
            <li>
                <button onClick={()=>navigate('/')}>
                主页
                </button>
            </li>
            <li>
                <button>
                图书管理
                </button>
            </li>
            <li>
                <button>
                读者管理
                </button>
            </li>
            <li>
                <button>
                借阅信息
                </button>
            </li>
        </ul>
        </>
    )
}

const MainPage = ()=>{
    return (
        <div>
            <div className="header">
                <Header/>
            </div>
            <div className="main">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MainPage;