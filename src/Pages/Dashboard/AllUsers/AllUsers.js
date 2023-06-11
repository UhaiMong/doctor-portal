import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpiner from '../../../Components/LoadingSpiner';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    const [deleteUser, setDeleteUser] = useState(null);
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users')
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <LoadingSpiner />
    }

    const handleAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('Token')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Approved to admin");
                    refetch();
                }
                console.log(data);
            })
    }
    if (isLoading) {
        return <LoadingSpiner />
    }

    const closeModal = () => {
        setDeleteUser(null);
    }

    const handleUserDelete = (user) => {
        console.log(user);
        fetch(`http://localhost:5000/users/${user?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`You have deleted ${user?.name} successfully`);
                refetch();
            })
    }

    return (
        <div>
            <h1 className='text-3xl font-semibold'>All Users: {users?.length}</h1>
            <div className="overflow-x-auto mt-7">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users &&
                            users?.map((user, index) => <tr
                                key={user._id}
                            >
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    {
                                        user?.role !== 'admin' &&
                                        <button onClick={() => handleAdmin(user._id)} className='text-xs btn btn-outline btn-xs'>Make Admin</button>
                                    }
                                </td>
                                <td title='Delete'>
                                    {
                                        user?.role !== 'admin' &&
                                        <label
                                            onClick={() => setDeleteUser(user)} htmlFor="confirmation-modal"
                                            className=" text-red-600 p-1 font-bold cursor-pointer">
                                            X
                                        </label>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteUser &&
                <ConfirmationModal
                    message={`After deleting ${deleteUser.name}, will not be recovered.`}
                    title={`Are you sure want to delete?`}
                    closeModal={closeModal}
                    modalData={deleteUser}
                    deleteButton={'Yes'}
                    successAction={handleUserDelete}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default AllUsers;