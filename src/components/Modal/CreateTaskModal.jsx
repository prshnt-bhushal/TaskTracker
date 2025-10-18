import React, { useState } from 'react';
import './ModalStyles.css';
import closeIcon from '../../assets/Icons/close-icon.svg';
import { createTask } from '../../services/api';
import ValidateForm from './ValidateForm';
import toast from 'react-hot-toast';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    status: 'to-do',
    priority: 'low',
    description: '',
    createdAt: new Date().toISOString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = ValidateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      toast.error(Object.values(errors).join(', '));
      return;
    }

    try {
      await createTask(formData);
      onTaskCreated();
      onClose();
      toast.success('Task created successfully.');
      setFormData({
        title: '',
        dueDate: '',
        status: 'to-do',
        priority: 'low',
        description: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={closeIcon} alt="X" />
          </button>
        </div>
        <form className="create-task-form" onSubmit={handleCreateSubmit}>
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
                  defaultValue="to-do"
                  id="status-dropdown"
                  value={formData.status}
                  onChange={handleInputChange}
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
                  id="priority-dropdown"
                  value={formData.priority}
                  onChange={handleInputChange}
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

          <button type="submit" className="primary-button">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
