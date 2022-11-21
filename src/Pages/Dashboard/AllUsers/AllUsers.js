import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import LoadingSpiner from '../../../Components/LoadingSpiner';

const AllUsers = () => {
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

    const hadleAdmin = (id) => {
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
                                <td>{
                                    user?.role !== 'admin' &&
                                    <button onClick={() => hadleAdmin(user._id)} className='text-xs btn btn-outline btn-xs'>Admin</button>}</td>
                                <td title='Delete'><button className='btn btn-ghost rounded-full btn-xs text-red-800'>X</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;