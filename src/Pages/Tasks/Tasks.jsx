import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Components/sectiontitle/SectionTitle';
import axios from 'axios';
import { motion } from 'framer-motion';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    // https://click-n-cash-server.vercel.app
    useEffect(() => {
        axios.get('https://click-n-cash-server.vercel.app/allTasks')
            .then(response => {
                setTasks(response.data.slice(0, 8)); // Get only the first 8 tasks
            })
            .catch(error => {
                console.error("There was an error fetching the tasks!", error);
            });
    }, []);
    
    return (
        <div>
            <SectionTitle heading="Tasks" subHeading="Choose your tasks and make money" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {tasks.map((eachTask, index) => (
          <motion.div
            key={eachTask._id} 
            className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img className="w-full h-48 object-cover" src={eachTask.task_image_url} alt="Task Image" />
            <div className="p-6 flex-grow">
              <h2 className="font-semibold text-gray-800 mb-4">
                Task Title: <span className=" text-teal-700">{eachTask.task_title}</span>
              </h2>
              <p className="text-sm text-gray-600 mb-2"><strong>Completion Date:</strong> {eachTask.completion_date}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Payable Amount:</strong> ${eachTask.payable_amount}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Required Workers:</strong> {eachTask.required_workers}</p>
            </div>
            {/* <Link
                to={`taskDetails/${eachTask._id}`}
                className="block w-full text-center py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition duration-200"
              >
                View Details
              </Link> */}
          </motion.div>
        ))}
            </div>
            <div className="text-center mt-4">
                <Link to="/dashboard/taskList" className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Show all tasks
                </Link>
            </div>
        </div>
    );
};

export default Tasks;
