import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://click-n-cash-server.vercel.app/allTasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Delete task handler
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(`https://click-n-cash-server.vercel.app/allTasks/${id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          setTasks(tasks.filter((task) => task._id !== id));
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to delete task!', 'error');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl text-teal-700 font-semibold mb-4">Manage Tasks</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="px-6 py-3">Task ID</th>
              <th className="px-6 py-3">Task Name</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-teal-50">
                <td className="px-6 py-3">{task._id}</td>
                <td className="px-6 py-3">{task.task_title}</td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-2 text-red-500 hover:text-white hover:bg-red-600 rounded-md transition duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
