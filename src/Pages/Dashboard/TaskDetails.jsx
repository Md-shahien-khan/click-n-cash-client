import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'; // Import Swal

const TaskDetails = () => {
  const { id } = useParams(); // Capture task id from the URL
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate hook

  // Fetch the task details
  useEffect(() => {
    axios.get(`http://localhost:5000/allTasks/${id}`)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the task!", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const workerEmail = user.email; // Replace with actual worker email (from Auth context)
    const workerName = user.displayName; // Replace with actual worker name (from Auth context)
    const buyerName = task?.buyer_name || "Buyer Name"; // Assuming the task has a buyer_name field
    const buyerEmail = task?.buyer_email || "Buyer Email"; // Assuming the task has a buyer_email field
    const currentDate = new Date().toISOString();

    // Submit the submission to the backend
    try {
      await axios.post('http://localhost:5000/submissions', {
        task_id: task._id,
        task_title: task.task_title,
        payable_amount: task.payable_amount,
        worker_email: workerEmail,
        submission_details: submissionDetails,
        worker_name: workerName,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        current_date: currentDate,
        status: 'pending',
      });

      // Show success Swal
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful!',
        text: 'Your task submission has been successfully added.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/mySubmissions'); // Redirect to home page after success
      });

      setSubmissionDetails(''); // Clear the form
    } catch (error) {
      console.error("There was an error submitting the form!", error);

      // Show error Swal
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error submitting your task. Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      {task ? (
        <div>
          <h2 className="text-xl md:text-4xl font-semibold text-teal-950">{task.task_title}</h2>
          <div className="bg-white p-5 rounded shadow-md">
            <img src={task.task_image_url} alt={task.task_title} className="w-full h-64 object-cover mb-4" />
            <p><strong>Buyer Name:</strong> {task.buyer_name}</p>
            <p><strong>Completion Date:</strong> {task.completion_date}</p>
            <p><strong>Payable Amount:</strong> ${task.payable_amount}</p>
            <p><strong>Required Workers:</strong> {task.required_workers}</p>
            <p><strong>Task Description:</strong> {task.task_detail}</p>
          </div>

          <h3 className="mt-8 text-lg font-semibold">Submit Your Task</h3>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md"
              placeholder="Write your submission details here..."
            />
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Task
            </button>
          </form>
          
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetails;
