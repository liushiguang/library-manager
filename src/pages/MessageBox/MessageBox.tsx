import { useState } from "react";

// 生成更多的模拟数据
const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: i,
      username: `User ${i}`,
      feedback: `Feedback ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: `2024-05-${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`
    });
  }
  return data;
};

const FeedbackTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = generateMockData();
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden divide-y divide-gray-300">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
              用户ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
              用户名
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
              反馈内容
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
              时间
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {item.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.feedback}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">{item.time}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mr-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700'} rounded-lg focus:outline-none transition-colors duration-200`}
        >
          上一页
        </button>
        <div className="flex">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mr-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-lg focus:outline-none transition-colors duration-200`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700'} rounded-lg focus:outline-none transition-colors duration-200`}>
          下一页
        </button>
      </div>
    </div>
  );
};

const MessageBox = () => {
  return (
    <div className='forAdmin w-full h-full p-10'>
      <FeedbackTable />
    </div>
  );
};

export default MessageBox;
