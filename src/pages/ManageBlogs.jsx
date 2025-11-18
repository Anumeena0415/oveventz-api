import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loading, ButtonLoading } from '../components/Loading';


const ManageBlogs = () => {
    const navigate = useNavigate();
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
    
    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/blog`);
            setService(res.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }
        try {
            setDeletingId(id);
            await axios.delete(`${BASE_URL}/blog/delete/${id}`);
            await getdata();
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog");
        } finally {
            setDeletingId(null);
        }
    }

    const editBlog = (ele) => {
        navigate("/add-blog", { state: { data: ele } });
    }

    if (loading) {
        return <Loading message="Loading blogs..." />;
    }

    return (
        <div className='px-10 py-8 mx-10'>
            <div className='flex gap-x-96 '>
                <a className='inline-flex items-center bg-[#E69B83] hover:bg-[#f48965] px-4 py-2 text-white rounded-lg text-sm mb-6 transition' href="/admin">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin
                </a>
                <h3 className='font-bold text-3xl mx-20'>Manage Your Blogs</h3>
            </div>
            <h2 className='text-xl font-bold'>All Blogs</h2>

            <div className='cards mt-10 flex flex-wrap gap-5'>
                {service.length === 0 ? (
                    <p className="text-gray-500 text-center w-full py-8">No blogs found. Create your first blog!</p>
                ) : (
                    service.map((ele, ind) => (
                        <div key={ele._id || ind} className="card relative w-90 min-h-30 bg-zinc-200 rounded-md p-5 shadow-xl">
                            <h3 className="text-lg sm:text-xl font-bold pb-4 text-wrap">{ele.title}</h3>
                            <div className="flex absolute gap-5 bottom-3">
                                <button 
                                    onClick={() => editBlog(ele)} 
                                    disabled={deletingId === ele._id}
                                    className='bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-md text-white font-medium transition-colors flex items-center gap-2'
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => deleteBlog(ele._id)} 
                                    disabled={deletingId === ele._id || deletingId !== null}
                                    className='bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-md text-white font-medium transition-colors flex items-center justify-center'
                                >
                                    {deletingId === ele._id ? <ButtonLoading size="sm" /> : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ManageBlogs
