import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const BuyerHome = () => {
  const { user } = useContext(AuthContext);

  // Fetch tasks using TanStack Query
  const {
    data: submissions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://click-n-cash-server.vercel.app/buyersSubmissions/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if user email exists
  });

  // Handle Accept Work
  const acceptWork = async (task) => {
    try {
      const res = await axios.patch(`https://click-n-cash-server.vercel.app/acceptTask`, {
        previousId: task._id,
        worker_email: task.worker_email,
        workersCoin: task.payable_amount,
        buyer_email: user.email, // Pass the buyer's email
      });
      if (res.data.success) {
        Swal.fire('Success!', 'Task has been accepted and coins transferred.', 'success');
        refetch(); // Refetch submissions after accepting
      } else {
        Swal.fire('Error!', res.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to accept the task.', 'error');
    }
  };

  // Handle Reject Work
  const rejectWork = async (taskId) => {
    try {
      const res = await axios.patch(`https://click-n-cash-server.vercel.app/rejectTask`, {
        taskId,
      });
      if(res.data) {
        Swal.fire('Success!', 'Task has been rejected.', 'success');
        refetch(); 
      }
      } catch (error) {
        Swal.fire('Error!', 'Failed to reject the task.', 'error');
      }
    };

  // Handle View Work
  const viewWork = (task) => {
    Swal.fire({
      title: 'Submission Details',
      text: task.submission_details,
      confirmButtonText: 'Close',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl text-center text-teal-800 font-bold my-3">Job Applications From Worker</h2>
      <div className="w-full overflow-x-auto">
        <table className="table w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Task name</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map(
              (task, index) =>
                task.status === 'pending' && (
                  <tr key={task._id} className="bg-base-200 border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{task.task_title}</td>
                    <td className="px-4 py-2">{task.worker_name}</td>
                    <td className="px-4 py-2">{task.worker_email}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => acceptWork(task)} className="btn bg-teal-500">
                          Accept
                        </button>
                        <button onClick={() => viewWork(task)} className="btn bg-yellow-300">
                          View
                        </button>
                        <button onClick={() => rejectWork(task._id)} className="btn bg-red-400">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerHome;
