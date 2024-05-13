import { createBrowserRouter } from "react-router-dom";
import AnalysisDiagram from "@/pages/AnalysisDiagram/AnalysisDiagram";
import BookManage from "@/pages/BookManage/BookManage";
import LendInfo from "@/pages/LendInfo/LendInfo";
import MainPage from "@/pages/MainPage/MainPage";
import ReaderManage from "@/pages/ReaderManage/ReaderManage";
import MessageBox from "@/pages/MessageBox/MessageBox";
import Announcement from "@/pages/Announcement/Announcement";
import Login from "@/pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <MainPage />,
        children: [
            {
                index: true,
                element: <AnalysisDiagram />
            },
            {
                path: "bookManage",
                element: <BookManage />
            },
            {
                path: "readerManage",
                element: <ReaderManage />
            },
            {
                path: "lendInfo",
                element: <LendInfo />
            },
            {
                path: "notice",
                element: <Announcement />
            },
            {
                path: "messageBox",
                element: <MessageBox />
            }
        ]
    },
]
);

export default router;