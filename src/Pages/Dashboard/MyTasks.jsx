import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks when the component is mounted
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Update Task handler
  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Check if the updated task has valid data
    if (!selectedTask.task_title || !selectedTask.task_detail || !selectedTask.submission_info) {
      Swal.fire('Error', 'All fields must be filled!', 'error');
      return;
    }

    // Construct the updated task object
    const updatedTask = {
      ...selectedTask,
      task_title: selectedTask.task_title,
      task_detail: selectedTask.task_detail,
      submission_info: selectedTask.submission_info,
    };

    console.log('Updated Task:', updatedTask);  // Log the updated task

    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${selectedTask._id}`,
        updatedTask
      );

      if (response.status === 200) {
        Swal.fire('Success', 'Task updated successfully!', 'success');
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? updatedTask : task
          )
        );
        setIsEditing(false);
      }
    } catch (error) {
      Swal.fire('Error', `Failed to update task: ${error.message}`, 'error');
    }
  };

  // Delete Task handler
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
        const response = await axios.delete(`http://localhost:5000/tasks/${id}`);
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
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-teal-950 mb-6">My Tasks</h2>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <h3 className="text-xl mb-4">Update Task</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="task_title">
                Task Title
              </label>
              <input
                type="text"
                id="task_title"
                value={selectedTask.task_title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, task_title: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="task_detail">
                Task Detail
              </label>
              <textarea
                id="task_detail"
                value={selectedTask.task_detail}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, task_detail: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="submission_info">
                Submission Info
              </label>
              <input
                type="text"
                id="submission_info"
                value={selectedTask.submission_info}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, submission_info: e.target.value })
                }
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
            >
              Update Task
            </button>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Task Title</th>
                <th className="px-4 py-2 border">Task Detail</th>
                <th className="px-4 py-2 border">Submission Info</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date))
                .map((task) => (
                  <tr key={task._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{task.task_title}</td>
                    <td className="px-4 py-2 border">{task.task_detail}</td>
                    <td className="px-4 py-2 border">{task.submission_info}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleUpdate(task)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
