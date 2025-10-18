import React, { useEffect, useState } from 'react';
import './ModalStyles.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import { deleteTask, updateTask } from '../../services/api';
import ValidateForm from './ValidateForm';
import toast from 'react-hot-toast';

const EditTaskModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  console.log(task);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    status: 'to-do',
    priority: 'low',
    description: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        dueDate: task.dueDate || '',
        status: task.status || 'to-do',
        priority: task.priority || 'low',
        description: task.description || '',
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = ValidateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      toast.error(Object.values(errors).join(', '));
      return;
    }

    try {
      await updateTask(task.id, formData);
      toast.success('Task updated successfully.');
      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  const handleDelete = async () => {
    setShowDeleteConfirmation(false);
    console.log('Delete task with id:', task.id);
    try {
      await deleteTask(task.id);
      onClose();
      onTaskUpdated();
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please try again.');
      return;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Edit Task</h2>
            <button className="modal-close-button" onClick={onClose}>
              <img src={closeIcon} alt="X" />
            </button>
          </div>
          <form className="create-task-form" onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                Title <span className="text-red">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">
                Due Date <span className="text-red">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                id="due-date-picker"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">
                  Status <span className="text-red">*</span>
                </label>
                <div className="sortby-container">
                  <select
                    className="sortby-dropdown"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    defaultValue="to-do"
                    id="status-dropdown"
                  >
                    <option value="to-do">To Do</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <div className="sortby-container">
                  <select
                    className="sortby-dropdown"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    defaultValue="low"
                    id="priority-dropdown"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                Save
              </button>
              <button
                className="transparent-button"
                type="button"
                onClick={onClose}
              >
                Discard
              </button>
              <button
                className="delete-button"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
      {showDeleteConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
            </div>
            <p
              style={{
                margin: '1rem 0',
              }}
            >
              Are you sure you want to delete this task?
            </p>

            <div className="form-actions">
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="transparent-button"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskModal;
