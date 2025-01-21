import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider'; // Import AuthContext

const TaskDetails = () => {
  const { taskId } = useParams(); // Get the task ID from the URL parameter
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [workerName, setWorkerName] = useState('');
  
  // Use AuthContext to get the user info (email, name, etc.)
  const { user } = useContext(AuthContext); // Access user object from AuthContext

  useEffect(() => {
    // Fetch task details using axios
    axios.get(`http://localhost:5000/tasks/${taskId}`)
      .then(response => {
        setTask(response.data); // Set task data
      })
      .catch(error => {
        console.error("There was an error fetching the task details!", error);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure worker's email and buyer's email are retrieved from the user object
    const workerEmail = user?.email; // Get email from logged-in user
    const buyerEmail = user?.email; // You can set this dynamically from the buyer

    const currentDate = new Date().toLocaleDateString();

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.name,
      submission_details: submissionDetails,
      buyer_name: user?.name, // You can set this dynamically
      buyer_email: user?.email, // You can set this dynamically
      current_date: currentDate,
      status: "pending", // Initial status is pending
    };

    // Send the submission data to the backend using axios
    axios.post('http://localhost:5000/submissions', submissionData)
      .then(response => {
        alert("Submission successful!");
      })
      .catch(error => {
        console.error("There was an error submitting the form!", error);
      });
  };

  if (!task) return <div>Loading task details...</div>;

  return (
    <div className="w-10/12 mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{task.task_title}</h2>
        <p className="mt-2">Complete the task by submitting your details below.</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Task Information</h3>
        <p><strong>Task Description:</strong> {task.description}</p>
        <p><strong>Completion Date:</strong> {task.completion_date}</p>
        <p><strong>Payable Amount:</strong> ${task.payable_amount}</p>
        <p><strong>Required Workers:</strong> {task.required_workers}</p>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div>
          <label htmlFor="workerName" className="block">Your Name</label>
          <input
            type="text"
            id="workerName"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="submissionDetails" className="block">Submission Details</label>
          <textarea
            id="submissionDetails"
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default TaskDetails;
