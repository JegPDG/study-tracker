import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';
import TextareaAutosize from 'react-textarea-autosize';

const NoteDetailViewandEdit = () => {
  const { subjectId, noteId } = useParams();
  const isEditMode = Boolean(noteId);
  const navigate = useNavigate();
  
  const [editForm, setEditForm] = useState(!isEditMode)
  const [updateData, setUpdateData] = useState({
    title: '',
    content: ''
  });
  const queryClient = useQueryClient();

  // Create 
  const createNoteMutation = useMutation({
  
    mutationFn: async (newData) => {
      const dataWithSubject = {
        ...newData, 
        subject_id: subjectId
      }

      const res = await api.post('/note/', dataWithSubject);
      return res.data;
    },
    onSuccess: (data) => {
      navigate(`/subjects/${subjectId}/notes/${data.id}`);; // Redirect to the new note
    },
    onError: (error) => {
      console.log('Failed to create', error);
      alert("")
    }
  });

  // Getting the note Function
  const {data: noteDetailView, isLoading, error} = useQuery({
    queryKey: ['noteDetailView', noteId],
    queryFn: async () => {
      const response = await api.get(`note/${noteId}`);
      return response.data;
    },
    enabled: isEditMode, // Only fetch when noteId exists
    staleTime: 1000 * 60 * 5, // Optional: cache for 5 minutes
  });

  console.log(noteDetailView)
  // Delete
  const handleDelete = async () => {
    if(window.confirm('Do you want to delete this note?')){
      try {
        await api.delete(`/note/${noteId}/`); // Fixed: was 'id', now 'noteId'
        navigate(`/subjects/${noteDetailView?.subject?.id || subjectId}`);
        console.log('Note deleted');
      } catch (error) {
        console.log('Unable to delete', error);
      }
    } else {
      alert("Note not deleted");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (noteDetailView?.subject?.id) {
      navigate(`/subjects/${noteDetailView.subject.id}`);
    } else if (subjectId) {
      navigate(`/subjects/${subjectId}`);
    } else {
      navigate(-1);
    }
  };



  // EditNote section ----------------------------------------------------------

  // Single useEffect to handle form initialization
  useEffect(() => {
    if (isEditMode && noteDetailView) {
      // In edit mode, populate from fetched data
      setUpdateData({
        title: noteDetailView.title || '',
        content: noteDetailView.content || ''
      });
    } else if (!isEditMode) {
      // In create mode, keep form empty
      setUpdateData({ title: '', content: '' });
    }
  }, [isEditMode, noteDetailView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(error)

  // Mutation for updating the note
  const updateNoteMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.patch(`/note/${noteId}/`, data);
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
    
    if (!updateData.title.trim() || !updateData.content.trim()) {
      alert('Please fill in both the title and content before saving.');
      return;
    }
    if (isEditMode) {
      updateNoteMutation.mutate(updateData);
    } else {
      createNoteMutation.mutate(updateData);
    }
  };

  // Logs -------------------------------------------------------------------------
  console.log("Note detail View", noteDetailView)
  // console.log("Note Detail Error GET:", error)

  if(isLoading) {
    return(
      <div className='loading'>
        <span className='loader'></span>
      </div>
    )
  }

  return (
    <div className='pt-4 pl-8'>

      <div className='flex flex-row justify-between '>
        <div 
          onClick={handleBack}
          className='hover:bg-purple-3 bg-purple-2 inline-block p-2 rounded-sm'>
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
          <TextareaAutosize
            value={updateData.content}
            onChange={handleChange}
            name="content"
            placeholder='Type something...' 
            className='min-h-[350px] bg-white-3 mt-4 rounded-sm p-4 w-full '
          ></TextareaAutosize>
          {/* <textarea 
            value={updateData.content}
            onChange={handleChange}
            name="content"
            placeholder='Type something...' 
            className='min-h-[350px] bg-white-3 mt-4 rounded-sm p-4 w-full '
            ></textarea> */}
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