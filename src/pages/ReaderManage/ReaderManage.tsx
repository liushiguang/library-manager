import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { user } from '@/type/user';
import { on } from 'events';

const EditForm = (props: any) => {
  const {user, onChange, onSave, onCancel} = props

  return (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div 
            className= "w-[25%] border border-gray-300 rounded-2xl bg-white shadow-md p-6 transition-all duration-500 ease-in-out">
            <h2 className="text-center text-2xl font-semibold mb-4">编辑用户信息</h2>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="account" className="font-semibold">账号:</label>
                    <input 
                        type='text' 
                        id='account' 
                        name='account' 
                        value={user.user_account}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="user_name" className="font-semibold">用户名:</label>
                    <input 
                        type='text' 
                        id='user_name' 
                        name='user_name' 
                        value={user.user_name}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold">密码:</label>
                    <input 
                        type='text' 
                        id='password' 
                        name='password' 
                        value={user.user_password}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="gender" className="font-semibold">性别:</label>
                    <input 
                        type='text' 
                        id='gender' 
                        name='gender' 
                        value={user.gender}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="font-semibold">手机号码:</label>
                    <input 
                        type='text' 
                        id='phone' 
                        name='phone' 
                        value={user.phone}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold">邮箱:</label>
                    <input 
                        type='text' 
                        id='email' 
                        name='email' 
                        value={user.email}
                        onChange={onChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={onCancel}
                        className="glass py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                        取消
                    </button>
                    <button 
                        onClick={onSave}
                        className="glass py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                        保存
                    </button>
                </div>
            </form>
          </div>
        </div>
  )     
}

const ReaderManage = ()=> {
  const iniUser: user = {
    user_id: -1,
    user_account: '',
    user_name: '',
    user_password: '',
    gender: '',
    phone: '',
    email: ''
  }
  
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<user[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [isEditing, setIsEditing] = useState(false)
  const [editingUser, setEditingUser] = useState<user>(iniUser)
  

  // 获取图书数据,并设置users数组,以显示在页面上,依赖于currentPage和usersPerPage
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users')
      
      const responseUsers = response.data.data
      setUsers(responseUsers)
    }

    fetchUsers();
  }, [currentPage, usersPerPage])

  // 计算总页数
  const totalPages = Math.ceil(users.length / usersPerPage)

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

  const handleSearch = (userName: string) => {
    const searchedUsers = users.filter((item: user) => item.user_name === userName)
    setUsers(searchedUsers)
  }

  const handleEditUser = (cuser: user) => {
    setEditingUser(cuser) //设置正在编辑的用户
    setIsEditing(true) // 显示编辑框
  }

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = window.confirm('确定要删除该用户?')
    
    // 若确认删除该用户
    if (confirmDelete) {
      // 发送Delete请求到后端API，以删除该用户
      const response = await axios.delete(`http://localhost:5000/users/${id}`)
      // 如果请求成功，则更新users数组
      if (response.data.code === 20012) {
        setUsers(users.filter((item: user) => item.user_id !== id)) // 删除该用户
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser({...editingUser, [event.target.name]: event.target.value})
  }

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  // 保存编辑
  const handleSaveUser = async () => {
    // 发送Put请求到后端API，以更新用户的信息
    const response = await axios.put(`http://localhost:5000/users/${editingUser.user_id}`, editingUser)
    // 如果请求成功，则更新currentUsers数组
    if (response.data.code === 20013) {
      setUsers(users.map((item: user) => item.user_id === editingUser.user_id ? editingUser : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
          <input
            type="text"
            placeholder="Search Users"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>账号</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>姓名</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>密码</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>性别</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>手机</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>邮箱</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>操作类型</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的用户数据 */}
              {
                users
                .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
                .map((item: user) => (
                  <tr key={item.user_id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.user_account}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.user_name}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.user_password}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.gender}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.phone}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.email}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditUser(item)}
                              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none">
                              修改
                          </button>
                          <button 
                              onClick={() => handleDeleteUser(item.user_id)}
                              className="py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 transform hover:scale-105 focus:outline-none">
                              删除
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
            isEditing && <EditForm user={editingUser} onChange={handleInputChange} onSave={handleSaveUser} onCancel={handleCancelEdit}/> 
          }
    </div>
  )
}

export default ReaderManage;