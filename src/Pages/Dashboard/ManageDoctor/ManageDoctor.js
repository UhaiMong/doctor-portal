import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpiner from '../../../Components/LoadingSpiner';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null)
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors', {
                headers: {
                    authorization:`Bearer ${localStorage.getItem('Token')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <LoadingSpiner />
    }

    const closeModal = () => {
        setDeleteDoctor(null)
    }

    // delete doctor
    const handleAction = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor?._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('Token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`Permanently deleted ${doctor?.name} information`);
                    refetch();
                }
            })
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold">Manage doctors</h1>

            <div className="overflow-x-auto mt-7">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors &&
                            doctors?.map((doctor, index) => <tr
                                key={doctor._id}
                            >
                                <th>{index + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={doctor.image} alt='doctor profile' />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>

                                <td title='Delete'>
                                    <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className=" bg-red-600 rounded-lg text-white p-1 hover:btn-outline btn-error cursor-pointer">Delete</label>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDoctor &&
                <ConfirmationModal
                    title={`Are you sure want to delete?`}
                    message={`After deleting ${deleteDoctor.name}, will not be recovered.`}
                    successAction={handleAction}
                    modalData={deleteDoctor}
                    deleteButton={'Delete'}
                    closeModal={closeModal}
                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;