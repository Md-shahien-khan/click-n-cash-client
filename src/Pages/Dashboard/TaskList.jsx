import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 
import { AuthContext } from '../../Providers/AuthProvider';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const {user} = useContext(AuthContext);
  console.log(user)

  useEffect(() => {
    axios.get('https://click-n-cash-server.vercel.app/allTasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <div className="text-center">
        <h2 className="text-xl md:text-4xl font-semibold text-teal-950">Tasks</h2>
        <p className="px-4 text-teal-900">Start earning money by completing simple tasks like clicking ads and surveys.</p>
      </div>
      {/* task card */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3 mt-5 md:mt-10">
        {tasks.map(eachTask => (
          <div key={eachTask._id} className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={eachTask.task_image_url} alt="Task Image" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Task Title: <span className="font-medium text-blue-600">{eachTask.task_title}</span>
              </h2>
              <p className="text-sm text-gray-600 mb-2"><strong>Buyer Name:</strong> {user.displayName
              }</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Completion Date:</strong> {eachTask.completion_date}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Payable Amount:</strong> ${eachTask.payable_amount}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Required Workers:</strong> {eachTask.required_workers}</p>

              <Link
              to={`taskDetails/${eachTask._id}`} 
              className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;




























// import React, {  useEffect, useState } from 'react';
// // import { AuthContext } from '../../Providers/AuthProvider';
// // import { key } from 'localforage';
// // import useTask from '../../hooks/useTask';

// const TaskList = () => {
//     // const {tasks} = useTask();
//     const [task, setTask] = useState([]);
//     useEffect(() => {
//         fetch('https://click-n-cash-server.vercel.app/tasks')
//         .then(res => res.json())
//         .then(data => {
//                 setTask(data);
//             });
//         }, []);
//     return (
        
//         <div className='w-10/12 mx-auto'>               
//                 <div className='text-center'>
//                     <h2 className='text-xl md:text-4xl font-semibold text-teal-950'>Tasks</h2>
//                     <p className='px-4 text-teal-900'>Start earning money by completing simple tasks like clicking ads and surveys.</p>
//                 </div>
//                 {/* task card */}
//                 <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-3 mt-5 md:mt-10'>
//                     {
//                         task.map(eachTask => 
//                             <div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//                             <img class="w-full h-48 object-cover" src={eachTask.task_image_url} alt="Task Image"></img>
//                             <div class="p-6">
//                                 <h2 class="text-xl font-semibold text-gray-800 mb-4">Task Title: <span class="font-medium text-blue-600">{eachTask.task_title}</span></h2>
//                                 <p class="text-sm text-gray-600 mb-2"><strong>Buyer Name:</strong>shawon</p>
//                                 <p class="text-sm text-gray-600 mb-2"><strong>Completion Date:</strong>{eachTask.completion_date}</p>
//                                 <p class="text-sm text-gray-600 mb-2"><strong>Payable Amount:</strong> ${eachTask.payable_amount
//                                 }</p>
//                                 <p class="text-sm text-gray-600 mb-4"><strong>Required Workers:</strong>{eachTask.required_workers}</p>
//                                 <button class="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">View Details</button>
//                             </div>
//                             </div>

//                         )
//                     }
//                 </div>
//         </div>
//     );
// };

// export default TaskList;