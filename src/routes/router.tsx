import AnalysisDiagram from "@/pages/AnalysisDiagram/AnalysisDiagram";
import BookManage from "@/pages/BookManage/BookManage";
import LendInfo from "@/pages/LendInfo/LendInfo";
import MainPage from "@/pages/MainPage/MainPage";
import ReaderManage from "@/pages/ReaderManage/ReaderManage";
import Notice from "@/pages/Notice/Notice";
import MessageBox from "@/pages/MessageBox/MessageBox";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
                element: <Notice />
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