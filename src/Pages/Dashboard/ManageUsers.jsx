import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // handle delete
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    // handle role change
    const handleRoleChange = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `User role updated to ${newRole}`,
                        icon: "success"
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong.",
                    icon: "error"
                });
            });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Manage Users</h2>
                <h2 className="text-3xl">Total Users : {users.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-teal-900 font-semibold">{user.name}</h2>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {/* Role Dropdown */}
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="worker">Worker</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-400 text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
















// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { div } from "framer-motion/client";
// import { FaTrashAlt, FaUser } from "react-icons/fa";
// import Swal from "sweetalert2";


// const ManageUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const {data : users = [], refetch} = useQuery({
//         queryKey: ['users'],
//         queryFn : async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     });

//     // handle delete
//     const handleDeleteUser = user =>{
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//           }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/users/${users._id}`)
//                 .then(res => {
//                     if(res.data.deletedCount > 0){
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Your file has been deleted.",
//                             icon: "success"
//                         });
//                     }
//                 })
//             }
//           });
//     }

//     // handle make admin or user or worker
//     const handleMakeAdmin = user =>{
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 console.log(res.data)
//                 if(res.data.modifiedCount > 0){
//                     refetch()
//                     Swal.fire({
//                         title: `User role has been updated`,
//                         showClass: {
//                           popup: `
//                             animate__animated
//                             animate__fadeInUp
//                             animate__faster
//                           `
//                         },
//                         hideClass: {
//                           popup: `
//                             animate__animated
//                             animate__fadeOutDown
//                             animate__faster
//                           `
//                         }
//                     });
//                 }
//             })
//     }
//     return (
//         <div>
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-3xl">Manage Users</h2>
//                 <h2 className="text-3xl">Total Users : {users.length}</h2>
//             </div>


//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {
//                         users.map((user, index) =>
//                             <tr key={index}>
//                                 <td>
//                                 <div className="flex items-center gap-3">
//                                     <div className="avatar">
//                                     <div className="mask mask-squircle h-12 w-12">
//                                         <img
//                                         src={user?.photURL}
//                                         alt="" />
//                                     </div>
//                                     </div>
//                                     <div>
//                                     <h2 className="text-teal-900 font-semibold">{user.name}</h2>
//                                     </div>
//                                 </div>
//                                 </td>
//                                 <td>
//                                 {user.email}
//                                 </td>
//                                 <td>{user.role}</td>
//                                 <th>
//                                 <button 
//                                 onClick={handleMakeAdmin(user)} 
//                                 className="btn btn-ghost btn-xs">
//                                     <FaUser className="text-teal-600">
//                                     </FaUser>
//                                 </button>
//                                 </th>
//                                 <th>
//                                 <button 
//                                 onClick={handleDeleteUser(user)} 
//                                 className="btn btn-ghost btn-xs">
//                                 <FaTrashAlt className="text-red-400 text-xl">
//                                 </FaTrashAlt>
//                                 </button>
//                                 </th>
//                             </tr>   
//                         )
//                     }
//                     </tbody>
//                 </table>
//                 </div>
//         </div>
//     );
// };

// export default ManageUsers;