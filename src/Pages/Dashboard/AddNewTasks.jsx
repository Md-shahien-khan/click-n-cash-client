import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

const AddNewTasks = () => {
    const [taskDetails, setTaskDetails] = useState({
        task_title: '',
        task_detail: '',
        required_workers: 0,
        payable_amount: 0,
        completion_date: '',
        submission_info: '',
        task_image_url: '',  // This will store the image URL after upload
    });

    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    // Function to upload image to ImgBB
    const uploadImage = async (file) => {
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Assuming you're using Vite for env variables
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(image_hosting_api, formData);
            return response.data.data.url; // Return image URL from response
        } catch (error) {
            console.error("Image upload failed:", error);
            throw new Error("Image upload failed");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert `required_workers` and `payable_amount` to numbers
        const taskData = {
            task_title: taskDetails.task_title,
            task_detail: taskDetails.task_detail,
            required_workers: Number(taskDetails.required_workers),  // Ensure it's a number
            payable_amount: Number(taskDetails.payable_amount),      // Ensure it's a number
            completion_date: taskDetails.completion_date,
            submission_info: taskDetails.submission_info,
            task_image_url: taskDetails.task_image_url, // This will be updated after image upload
        };

        // Upload the image and get the image URL if an image is selected
        let imageUrl = '';
        if (imageFile) {
            try {
                imageUrl = await uploadImage(imageFile);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to upload image. Please try again.',
                });
                return;
            }
        }

        // Update task data with the image URL if it was successfully uploaded
        taskData.task_image_url = imageUrl;

        try {
            // Send the task data to your backend
            const response = await axios.post('http://localhost:5000/tasks', taskData);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Task Added!',
                    text: 'Your task has been successfully added.',
                });

                // Optionally navigate to the task list or home page
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an issue adding the task.',
                });
            }
        } catch (err) {
            console.error('Error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error with the task submission.',
            });
        }
    };

    return (
        <div className="w-10/12 mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-teal-950 mb-6">Add New Task</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="task_title">Task Title</label>
                    <input
                        type="text"
                        id="task_title"
                        name="task_title"
                        value={taskDetails.task_title}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="task_detail">Task Detail</label>
                    <textarea
                        id="task_detail"
                        name="task_detail"
                        value={taskDetails.task_detail}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter task description"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="required_workers">Required Workers</label>
                    <input
                        type="number"
                        id="required_workers"
                        name="required_workers"
                        value={taskDetails.required_workers}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter the number of workers"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="payable_amount">Payable Amount</label>
                    <input
                        type="number"
                        id="payable_amount"
                        name="payable_amount"
                        value={taskDetails.payable_amount}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="Enter amount per worker"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="completion_date">Completion Date</label>
                    <input
                        type="date"
                        id="completion_date"
                        name="completion_date"
                        value={taskDetails.completion_date}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="submission_info">Submission Info</label>
                    <input
                        type="text"
                        id="submission_info"
                        name="submission_info"
                        value={taskDetails.submission_info}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        placeholder="What to submit (screenshot, proof)"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="task_image_url">Task Image</label>
                    <input
                        type="file"
                        id="task_image_url"
                        name="task_image_url"
                        onChange={handleImageChange}
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddNewTasks;


