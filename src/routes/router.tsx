import AnalysisDiagram from "@/pages/AnalysisDiagram/AnalysisDiagram";
import BookManage from "@/pages/BookManage/BookManage";
import LendInfo from "@/pages/LendInfo/LendInfo";
import MainPage from "@/pages/MainPage/MainPage";
import ReaderManage from "@/pages/ReaderManage/ReaderManage";
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
            }
        ]
    },
]
);

export default router;