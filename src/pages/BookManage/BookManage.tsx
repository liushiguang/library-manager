import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { book } from '@/type/book';

const BookManage = ()=> {
  const iniBook: book = {
    book_id: -1,
    book_name: '',
    author: '',
    category: '',
    press: '',
    number: 0,
    stars: 0
  }
  
  const [searchTerm, setSearchTerm] = useState("")
  const [books, setBooks] = useState<book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(10)
  const [isEditing, setIsEditing] = useState(false)
  const [editingBook, setEditingBook] = useState<book>(iniBook)
  

  // 获取图书数据,并设置books数组,以显示在页面上,依赖于currentPage和booksPerPage
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:5000/books')
      
      const responseBooks = response.data.data
      setBooks(responseBooks)
    }

    fetchBooks();
  }, [currentPage, booksPerPage])

  // 计算总页数
  const totalPages = Math.ceil(books.length / booksPerPage)

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

  const handleSearch = (bookName: string) => {
    const searchedBooks = books.filter((item: book) => item.book_name === bookName)
    setBooks(searchedBooks)
  }

  const handleEditBook = (cbook: book) => {
    setEditingBook(cbook) //设置正在编辑的书籍
    setIsEditing(true) // 显示编辑框
  }

  const handleDeleteBook = async (id: number) => {
    const confirmDelete = window.confirm('确定要删除该图书?')
    
    // 若确认删除该图书
    if (confirmDelete) {
      // 发送Delete请求到后端API，以删除该图书
      const response = await axios.delete(`http://localhost:5000/books/${id}`)
      // 如果请求成功，则更新books数组
      if (response.data.code === 20012) {
        setBooks(books.filter((item: book) => item.book_id !== id)) // 删除该图书
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingBook({...editingBook, [event.target.name]: event.target.value})
  }

  const handleSaveBook = async () => {
    // 发送Put请求到后端API，以更新书籍的信息
    const response = await axios.put(`http://localhost:5000/books/${editingBook.book_id}`, editingBook)
    // 如果请求成功，则更新currentBooks数组
    if (response.data.code === 20013) {
      setBooks(books.map((item: book) => item.book_id === editingBook.book_id ? editingBook : item))
    }
    // 关闭编辑框
    setIsEditing(false)
  }

  return(
    <div className="container mx-auto mt-4">
          <div className='w-full flex flex-row'>
          <input
            type="text"
            placeholder="Search Books"
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
                <th className='border border-gray-400 px-4 py-2 text-lg'>图书名称</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>图书作者</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>出版社</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>图书类别</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>剩余数量</th>
                <th className='border border-gray-400 px-4 py-2 text-lg'>操作类型</th>
              </tr>
            </thead>
            <tbody>
              {/* 显示当前页的图书数据 */}
              {
                books
                .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
                .map((item: book) => (
                  <tr key={item.book_id} className='font-sans text-lg hover:bg-gray-400/25 duration-200'>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.book_name}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.author}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.press}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.category}</td>
                    <td className='border border-gray-400 px-4 py-2 text-center'>{item.number}</td>
                    <td className='border border-gray-400 px-4 py-2'>
                      <div className='flex flex-row justify-evenly space-x-2'>
                        <button 
                              onClick={() => handleEditBook(item)}
                              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none">
                              编辑
                          </button>
                          <button 
                              onClick={() => handleDeleteBook(item.book_id)}
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
                <td colSpan={6} className='p-2'>
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
            // isEditing &&
            <div 
            className= {
              classNames("absolute w-[25%] top-[15%] left-[42%] border border-gray-300 rounded-2xl bg-white shadow-md p-6 transition-all duration-500 ease-in-out", {
                "opacity-0": !isEditing,
                "opacity-100": isEditing
              })}>

            <h2 className="text-center text-2xl font-semibold mb-4">编辑书籍信息</h2>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">图书名称:</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={editingBook.book_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="author" className="font-semibold">图书作者:</label>
                    <input 
                        type='text' 
                        id='author' 
                        name='author' 
                        value={editingBook.author}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="press" className="font-semibold">出版社:</label>
                    <input 
                        type='text' 
                        id='press' 
                        name='press' 
                        value={editingBook.press}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-semibold">图书类别:</label>
                    <input 
                        type='text' 
                        id='category' 
                        name='category' 
                        value={editingBook.category}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="number" className="font-semibold">剩余数量:</label>
                    <input 
                        type='text' 
                        id='number' 
                        name='number' 
                        value={editingBook.number}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="glass py-2 px-6 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                        取消
                    </button>
                    <button 
                        onClick={handleSaveBook}
                        className="glass py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                        保存
                    </button>
                </div>
            </form>
          </div>
          }
    </div>
  )
}

export default BookManage;