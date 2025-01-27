import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { AuthContext } from '../../Providers/AuthProvider';

const AddNewTasks = () => {
    const {user} = useContext(AuthContext);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const totalPayableAmount = Number(taskDetails.required_workers) * Number(taskDetails.payable_amount);
    
        // Task data
        const taskData = {
            task_title: taskDetails.task_title,
            task_detail: taskDetails.task_detail,
            required_workers: Number(taskDetails.required_workers),
            payable_amount: Number(taskDetails.payable_amount),
            completion_date: taskDetails.completion_date,
            submission_info: taskDetails.submission_info,
            task_image_url: taskDetails.task_image_url, 
            email: user?.email
        };
    
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
    
        taskData.task_image_url = imageUrl;
    
        try {
            const userResponse = await axios.get(`http://localhost:5000/users/${user?.email}`);
    
            if (userResponse.status === 200) {
                const currentCoins = userResponse.data.coins;
    
                // Check if the user has enough coins
                if (totalPayableAmount > currentCoins) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Not enough coins!',
                        text: 'You do not have enough coins to complete this task. Please purchase more coins.',
                    });
    
                    // Navigate to the Purchase Coin page
                    navigate('/purchase-coin');
                    return;
                } else {
                    // If the user has enough coins, proceed with adding the task
                    const taskResponse = await axios.post('http://localhost:5000/tasks', taskData);
    
                    if (taskResponse.status === 200) {
                        // Reduce the user's coins
                        const updatedCoins = currentCoins - totalPayableAmount;
    
                        // Update the user's coins in the userCollection
                        await axios.patch(`http://localhost:5000/users/coins/${userResponse.data._id}`, { coins: updatedCoins });
    
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Task Added!',
                            text: 'Your task has been successfully added.',
                        });
                        navigate('/');
                    }
                }
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        requiredasd
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


