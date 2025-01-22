import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GrUpdate } from 'react-icons/gr';
import { FaTrashAlt } from 'react-icons/fa';

const ManageTask = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/allTasks`);
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
            const response = await axios.delete(`http://localhost:5000/allTasks/${id}`);
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
        <div>
            <h2 className='text-xl text-teal-700 font-semibold'>Manage Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.task_title}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>
                        <button
                            onClick={() => handleDelete(task._id)}
                            className="px-4 py-2 text-red-400 text-xl rounded-md hover:bg-red-700 ">
                                <FaTrashAlt></FaTrashAlt>
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTask;
