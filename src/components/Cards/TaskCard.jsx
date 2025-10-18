const TaskCard = ({ task, handleCardClick }) => {
  // Calculate days remaining
  const calculateDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(task.dueDate);

  // Get status class
  const getStatusClass = (status) => {
    const statusMap = {
      todo: 'status-todo',
      pending: 'status-in-progress',
      completed: 'status-completed',
    };
    return statusMap[status] || 'status-todo';
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    const priorityMap = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
    };
    return priorityMap[priority] || '';
  };

  // Get deadline ribbon class
  const getDeadlineClass = (days) => {
    if (days < 0) return 'ribbon-overdue';
    if (days <= 3) return 'ribbon-urgent';
    if (days <= 7) return 'ribbon-warning';
    return 'ribbon-normal';
  };

  // Get deadline text
  const getDeadlineText = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day remaining';
    return `${days} days remaining`;
  };

  return (
    <div className="task-card" onClick={handleCardClick}>
      {daysRemaining !== null && task.status !== 'completed' && (
        <div className={`deadline-ribbon ${getDeadlineClass(daysRemaining)}`}>
          {getDeadlineText(daysRemaining)}
        </div>
      )}

      <h3>{task.title}</h3>
      <div style={{
        marginBottom: "0.5rem"
      }} className="form-row">
        <div className="task-info">
          <span className={`status-tag ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>

        <div className="task-info">
          <span className="task-label">Priority: </span>
          <span className={`priority-tag ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="task-info">
        <span className="task-label">Due Date: </span>
        <span className="task-due-date">{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
