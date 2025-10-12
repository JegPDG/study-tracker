import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';

const NoteDetailViewandEdit = () => {
  const { id } = useParams();
  const isEditable = Boolean(id);
  const navigate = useNavigate();
  
  const [editForm, setEditForm] = useState(false)
  const [updateData, setUpdateData] = useState({
    title: '',
    content: ''
  });
  const queryClient = useQueryClient();

  // Create 
  const createNoteMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await api.post('/note/', newData);
      return res.data;
    },
    onSuccess: (data) => {
      navigate(`/note/${data.id}`); // Redirect to the new note
    },
    onError: (error) => {
      console.log('Failed to create', error);
    }
  });

  useEffect(() => {
    if (isEditMode && noteDetailView) {
      setUpdateData({
        title: noteDetailView.title || '',
        content: noteDetailView.content || ''
      });
    } else {
      setUpdateData({ title: '', content: '' });
    }
  }, [isEditMode, noteDetailView]);

  // Getting the note Function
  const getNote = async () => {
    const response = await api.get(`note/${id}`)
    return response.data
  }
  // Getting the note API
  const {data: noteDetailView = [], isLoading, error} = useQuery({
    queryKey: ['noteDetailView'],
    queryFn: getNote,
    keepPreviousData: true
  })

  // Delete
  const handleDelete = async () => {
    if(window.confirm('Do you want to delete the subject?')){
      try {
      await api.delete(`/note/${id}/`)
      navigate(`/subject/${noteDetailView?.subject.id}`)
      console.log('Note deleted')
      } catch (error) {
        console.log('Unable to delete', error.text)
      }
      
    } else{
      alert("Subject not deleted")
    }
  }
 



  // EditNote section ----------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (noteDetailView) {
      setUpdateData({
        title: noteDetailView.title || '',
        content: noteDetailView.content || ''
      });
    }
  }, [noteDetailView]);

  // Mutation for updating the note
  const updateNoteMutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await api.patch(`/note/${id}/`, updateData);
      return res.data;
    },
    onSuccess: () => {
      setEditForm(false);
      // Refetch the note detail to get updated data
      queryClient.invalidateQueries(['noteDetailView']);
    },
    onError: (error) => {
      console.log('Failed to update', error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateNoteMutation.mutate(updateData);
    } else {
      createNoteMutation.mutate(updateData);
    }
  };

  // Logs -------------------------------------------------------------------------
  console.log("Note detail View", noteDetailView)
  // console.log("Note Detail Error GET:", error)


  return (
    <div className='pt-4 pl-8'>

      <div className='flex flex-row justify-between '>
        <div className='hover:bg-purple-3 bg-purple-2 inline-block p-2 rounded-sm'>
          <ArrowLeftIcon className='size-6' fill='white'></ArrowLeftIcon>
        </div>
      </div>

      <div className='mt-4 flex gap-4'>
        <p className='font-medium opacity-60'>{noteDetailView?.subject?.name} &#8226; {noteDetailView?.updated_at}</p>
      </div>

      <div className='mt-2'>
        {editForm ? (
          <input type="text"
            className='text-4xl font-medium' 
            placeholder='Note Title'
            name='title'
            value={updateData.title}
            onChange={handleChange}  
            />
        )
      :
      (
          <p className='text-4xl font-medium'>{noteDetailView?.title}</p>
      )
      }
      </div>

      <div className='mt-8 flex gap-2'>
        {editForm ? (
          <button
            onClick={handleSubmit}
            disabled={updateNoteMutation.isLoading}
            className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80'>
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditForm(true)}
            className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80'>
            Edit
          </button>
        )}
        
        {isEditMode && (
          <button
            onClick={handleDelete}
            className='bg-purple-1 pt-2 pb-2 pr-4 pl-4 text-white-1 rounded-sm cursor-pointer hover:bg-purple-1/80'>
            Delete
          </button>
        )}
      </div>

      {editForm ? (
        <div className='mr-4'>
          <textarea 
            value={updateData.content}
            onChange={handleChange}
            name="content" 
            className='min-h-[350px] bg-white-3 mt-4 rounded-sm p-4 w-full resize-none'
            ></textarea>
        </div>
      )
      :
      (
        <div className='min-h-[350px] bg-white-3 mt-4 mr-4 rounded-sm p-4 flex gap-4 flex-wrap'>
          {noteDetailView?.content}
        </div>
      )
    }
    </div>
  )
}

export default NoteDetailViewandEdit