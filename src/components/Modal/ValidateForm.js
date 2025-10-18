const ValidateForm = (formData) => {
  const errors = {};

  if (!formData.title) errors.title = 'Title is required';
  if (!formData.dueDate) errors.dueDate = 'Due date is required';
  if (!formData.status) errors.status = 'Status is required';

  return errors;
};

export default ValidateForm;
