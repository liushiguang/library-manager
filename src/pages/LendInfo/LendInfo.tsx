import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { borrow } from '@/type/borrow';

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
            className='fixed top-[1%] left-[32%] flex items-center justify-center bg-gray-800 bg-opacity-0'>
            {level === INFO_LEVEL && info_alert(msg)}
            {level === WARNING_LEVEL && warning_alert(msg)}
            {level === SUCCESS_LEVEL && success_alert(msg)}
            {level === ERROR_LEVEL && error_alert(msg)}
        </div>
    )
}

const LendInfo = ()=> {
  const [searchTerm, setSearchTerm] = useState("")
  const [borrows, setBorrows] = useState<borrow[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [borrowsPerPage] = useState(10)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [alertLevel, setAlertLevel] = useState(INFO_LEVEL)

  // 获取借阅数据,并设置borrows数组,以显示在页面上,依赖于currentPage和borrowsPerPage
  useEffect(() => {
    const fetchBorrows = async () => {
      const response = await axios.get('http://localhost:5000/borrows')
      
      const responseBorrows = response.data.data
      setBorrows(responseBorrows)
    }

    fetchBorrows();
  }, [currentPage, borrowsPerPage])

  // 计算总页数
  const totalPages = Math.ceil(borrows.length / borrowsPerPage)

  // 分页逻辑: 点击页码按钮,则设置currentPage为该页码
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  // 生成页码按钮
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}
                className='btn btn-circle glass'>
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  // 搜索逻辑：根据用户名搜索该用户的借阅信息
  const handleSearch = (userName: string) => {
    const searchedBorrows = borrows.filter((item: borrow) => item.user_name === userName)
    setBorrows(searchedBorrows)
  }

  // 同意借阅逻辑
  const handleAgreeBorrow = async (item: borrow) => {
    item.is_agree = 1
    const response = await axios.put(`http://localhost:5000/borrows/${item.id}`, item)
    
    // 修改成功
    if (response.data.code === 20063) {
        setShowAlert(true)
        setAlertMsg(response.data.msg)
        setAlertLevel(SUCCESS_LEVEL)
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)

    }
    // 修改失败
    else if (response.data.code === 40063 ) {
        setShowAlert(true)
        setAlertMsg(response.data.msg)
        setAlertLevel(ERROR_LEVEL)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)

    }

    // 修改borrows数组中的数据
    const newBorrows = borrows.map((borrowItem: borrow) => borrowItem.id === item.id ? item : borrowItem)
    setBorrows(newBorrows)
  }

  // 拒绝借阅逻辑
  const handleRejectBorrow = async (item: borrow) => {
    item.is_agree = -1
    const response = await axios.put(`http://localhost:5000/borrows/${item.id}`, item)
    
    // 修改成功
    if (response.data.code === 20063) {
        setShowAlert(true)
        setAlertMsg(response.data.msg)
        setAlertLevel(SUCCESS_LEVEL)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    
    }
    // 修改失败
    else if (response.data.code === 40063 ) {
        setShowAlert(true)
        setAlertMsg(response.data.msg)
        setAlertLevel(ERROR_LEVEL)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    
    }

    // 修改borrows数组中的数据
    const newBorrows = borrows.map((borrowItem: borrow) => borrowItem.id === item.id ? item : borrowItem)
    setBorrows(newBorrows)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
          <input
            type="text"
            placeholder="Search Readers"
            value={searchTerm}
            onChange={(event)=>handleSearchTerm(event.target.value)}
            className="basis-[85%] px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none hover:border-blue-500"
          />
          <button 
            onClick={()=>handleSearch(searchTerm)}
            className="basis-[15%] bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600 transition duration-200">
            Search
          </button>
          </div>
          
          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden font-sans">
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-gray-400 px-4 py-2 text-lg'>借阅者</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>图书名称</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>借阅日期</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>归还日期</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>是否归还</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>是否同意</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>操作</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的图书数据 */}
              {
                borrows
                .slice((currentPage - 1) * borrowsPerPage, currentPage * borrowsPerPage)
                .map((item: borrow) => (
                  <tr key={item.id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.user_name}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.book_name}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.borrow_date}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.expired_date}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.is_return ? "已归还" : "未归还" }</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>
                        {item.is_agree === 0 ? "等待处理" : item.is_agree === 1 ? "同意" : "拒绝"}
                    </td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={()=>handleAgreeBorrow(item)}
                              disabled={item.is_agree !== 0}
                              className={
                                classNames("py-2 px-6 bg-blue-500 text-white rounded-md", {
                                    "hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none": item.is_agree === 0
                                })}>
                              同意
                          </button>
                          <button 
                              onClick={()=>handleRejectBorrow(item)}
                              disabled={item.is_agree !== 0}
                              className={
                                classNames("py-2 px-6 bg-gray-200 text-gray-700 rounded-md", {
                                    "hover:bg-gray-300 transition duration-300 transform hover:scale-105 focus:outline-none": item.is_agree === 0
                                })}>
                              拒绝
                          </button>
                      </div>
                    </td>
                  </tr>  
                ))
              }
            </tbody>
            <tfoot>
              {/* 分页按钮 */}
              <tr>
                <td colSpan={7} className='p-2'>
                  <div className='w-full flex flex-row justify-center space-x-4'>
                    <button 
                      className='py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
                      onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      上一页
                    </button>
                    {renderPageButtons()}
                    <button 
                      className='py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
                      onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                      下一页
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
            {
                showAlert && <CustomAlert msg={alertMsg} level={alertLevel} />
            }

    </div>
  )
}

export default LendInfo;