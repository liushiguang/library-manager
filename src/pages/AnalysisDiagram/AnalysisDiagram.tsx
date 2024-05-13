import ReactEcharts from 'echarts-for-react';
import { useState } from 'react';
interface Book {
    id: string;
    title: string;
    author: string;
    borrowedTimes: number;
  }
  
  interface SystemLog {
    id: number;
    action: string;
    time: string;
    user: string;
    description: string;
  }
  
  interface Props {
    logs: SystemLog[];
  }

  const mockBooks: Book[] = [
    { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", borrowedTimes: 35 },
    { id: "2", title: "1984", author: "George Orwell", borrowedTimes: 28 },
    { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowedTimes: 22 },
    { id: "4", title: "活着", author: "余华", borrowedTimes: 40 },
    { id: "5", title: "三体", author: "刘慈欣", borrowedTimes: 38 },
    { id: "6", title: "红楼梦", author: "曹雪芹", borrowedTimes: 30 },
    { id: "7", title: "白鹿原", author: "陈忠实", borrowedTimes: 26 },
    { id: "8", title: "嫌疑人X的献身", author: "东野圭吾", borrowedTimes: 25 },
    { id: "9", title: "Brave New World", author: "Aldous Huxley", borrowedTimes: 20 },
    { id: "10", title: "Crime and Punishment", author: "Fyodor Dostoevsky", borrowedTimes: 18 },
  ];

  const Leaderboard: React.FC<{ books: Book[] }> = ({ books }) => {
    // Sort books by borrowedTimes in descending order
    const sortedBooks = books.sort((a, b) => b.borrowedTimes - a.borrowedTimes).slice(0, 10);
  
    return (
        <div className="p-4 bg-gray-100 rounded shadow-md transition-transform transform">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span role="img" aria-label="hot" className="mr-2">🔥</span> 本月借阅次数最多的十本书排行榜
            </h2>
            <ol>
                {sortedBooks.map((book, index) => (
                <li key={book.id} className="flex items-center py-2 transition-all duration-300 hover:bg-gray-200">
                    <span className="mr-2 text-gray-600">{index + 1}.</span>
                    <span className="mr-4">{book.title} by {book.author}</span>
                    <span className="text-gray-600">{book.borrowedTimes} 次借阅</span>
                    {index < 3 && <span role="img" aria-label="hot" className="text-red-500 ml-2">🔥</span>}
                </li>
                ))}
            </ol>
        </div>
    );
  }

  const SystemLogTable: React.FC<Props> = ({ logs }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white text-lg">
              <th className="py-2 px-4">操作类型</th>
              <th className="py-2 px-4">操作时间</th>
              <th className="py-2 px-4">操作人员</th>
              <th className="py-2 px-4">详细描述</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="text-sm">
                <td className="border px-4 py-2">{log.action}</td>
                <td className="border px-4 py-2">{log.time}</td>
                <td className="border px-4 py-2">{log.user}</td>
                <td className="border px-4 py-2">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

const AnalysisDiagram = ()=> {
    // const bookCategory: pair[] = []
    // const bookCategory: {[key: string]: number} = {}

    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         const response = await axios.get('http://localhost:5000/books')
    //         const books = response.data.data
    //         // 遍历books 寻找所有种类的图书
    //         books.map((item: book) => {
    //             // const foundPair = bookCategory.find(pair => pair.category === item.category);
    //             // if (foundPair) {
    //             //     foundPair.number += item.number;
    //             // } else {
    //             //     bookCategory.push({ category: item.category, number: item.number });
    //             // }
    //             if (item.category in bookCategory) {
    //                 bookCategory[item.category] += item.number
    //             } else {
    //                 bookCategory[item.category] = item.number
    //             }
    //         })
    //     }
        
    //     fetchBooks()
    // },[bookCategory])

    const bookCategory: {[key: string]: number} = {
        "儿童文学类" : 26,
        "军事类" : 45,
        "历史地理类" : 7,
        "哲学类" : 9,
        "商业类" : 6,
        "奇幻" : 6,
        "小说" : 23,
        "工学类" : 6,
        "心理学类" : 53,
        "文学类" : 112,
        "武侠" : 7,
        "爱情" : 18,
        "现实主义小说" : 5,
        "社会学类" : 23,
        "科幻" : 8,
        "科普类" : 43,
        "经济类" : 55,
        "职业发展类" : 12,
        "计算机类" : 211,
        "魔幻现实主义" : 10
    }

    // echarts 饼状图配置项
    const pieChartData = Object.keys(bookCategory).map((key: string) => ({name: key, value: bookCategory[key]}))

    const optionForBook = {
        title: {
            text: '图书统计表',
            left: 'center',
            top: '5%',
            // 主标题样式
            textStyle: {
                fontWeight: 'normal',
                fontSize: 18
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: '图书种类',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                label: {
                    formatter: '{b}: {d}%',
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                labelLine: {
                    length: 10,
                    length2: 15
                },
                itemStyle: { // 美化每个扇形块的样式
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                emphasis: { // 高亮样式
                    itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                data: pieChartData,
                // 添加颜色配置
                color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC']
            }
        ]
    };

    // 用户活跃时间段统计
    const optionForUser = {
        title: {
          text: '用户活跃时间段统计',
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
          axisLabel: {
            color: '#666',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
          axisLabel: {
            color: '#666',
          },
          splitLine: {
            lineStyle: {
              color: '#eee',
            },
          },
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true,
        },
        series: [
          {
            name: '活跃用户数量',
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 160, 230, 340, 420, 380, 300, 280, 320, 400, 450, 420, 380, 300, 280, 220, 180, 150, 130],
            itemStyle: {
              color: '#5470C6',
            },
            label: {
              show: true,
              position: 'top',
              color: '#333',
            },
          },
        ],
      };

    // 借阅统计数据
    const borrowingData = [100, 150, 200, 180, 220, 250, 300, 280, 320, 350, 400, 380];
    const optionForBorrow = {
        title: {
          text: '借阅统计数据',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '借阅量',
            type: 'line',
            data: borrowingData,
            lineStyle: {
              width: 3, // 调整线条粗细
            },
            itemStyle: {
              color: '#007bff', // 修改折线颜色
            },
            areaStyle: {
              color: 'rgba(0, 123, 255, 0.1)', // 添加折线下阴影效果
            },
          },
        ],
      };

    // 生成模拟的系统操作记录数据
    const generateLogs = () => {
        const actions = ['图书添加', '图书删除', '用户注册', '通知发布'];
        const users = ['管理员A', '管理员B', '管理员C', '管理员D'];
        const descriptions = [
        '添加了《JavaScript高级程序设计》',
        '删除了《计算机网络》',
        '注册了新用户：用户C',
        '发布了关于系统更新的通知',
        ];

        let generatedLogs = [];
        for (let i = 1; i <= 50; i++) {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const log = {
            id: i,
            action: randomAction,
            time: new Date().toLocaleString(),
            user: randomUser,
            description: randomDescription,
        };
        generatedLogs.push(log);
        }
        return generatedLogs;
    };
    const [logs, setLogs] = useState(generateLogs());
    const [currentPage, setCurrentPage] = useState(0);
  
    // 计算总页数
    const totalPages = Math.ceil(logs.length / 5);
  
    // 当前页的数据
    const currentLogs = logs.slice(currentPage * 5, currentPage * 5 + 5);

    return (
        <div className="w-full h-full">
            {/* 
                主页
                1. 图书统计数据
                    饼状图：表示不同种类图书分布情况
                2. 用户统计数据
                    柱状图：用户活跃时间段
                3. 借阅统计数据
                    排行榜：借阅次数最多的图书
                    折线图：借阅情况趋势图（每月借阅量变化）
                4. 系统运营数据
                    表格：系统操作记录（如图书添加、删除、用户注册、通知发布等）
            */}
            <div className="forBook h-96 rounded-md shadow-md p-8">
                <ReactEcharts option={optionForBook} />
            </div>
            <div className="forUser h-96 rounded-md shadow-md p-8">
                <ReactEcharts option={optionForUser} />
            </div>
            <div className="forBorrow h-96 rounded-md shadow-md p-8">
                <ReactEcharts option={optionForBorrow} />
            </div>
            <div className='forBorrow h-96 rounded-md shadow-md p-8'>
                <Leaderboard books={mockBooks} />
            </div>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">系统操作记录</h1>
                <SystemLogTable logs={currentLogs} />
                <div className="mt-4 flex justify-center gap-4">
                    <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    前一页
                    </button>
                    <div className="flex">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`mx-1 px-3 py-2 rounded ${
                            currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        >
                        {index}
                        </button>
                    ))}
                    </div>
                    <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    下一页
                    </button>
                </div>
                </div>
            </div>
    )
}

export default AnalysisDiagram;