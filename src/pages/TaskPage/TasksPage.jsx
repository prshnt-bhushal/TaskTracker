import { useEffect, useState, useMemo } from 'react';
import '../PageStyles.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { CreateTaskModal, EditTaskModal, TaskCard } from '../../components';
import { fetchTasks } from '../../services/api';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const TasksPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const categories = ['All', 'to-do', 'pending', 'completed'];

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleCreateTaskModal = () => {
    setShowCreateTaskModal((prev) => !prev);
  };

  const toggleEditTaskModal = () => {
    setShowEditTaskModal((prev) => !prev);
  };

  const handleCardClick = (task) => {
    toggleEditTaskModal();
    setSelectedTask(task);
  };

  const getAllTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (activeCategory !== 'All') {
      filtered = filtered.filter((task) => task.status === activeCategory);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(debouncedSearchTerm)
      );
    }

    if (sortBy === 'acending') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'decending') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'priority-high') {
      const order = { high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => order[b.priority] - order[a.priority]);
    } else if (sortBy === 'priority-low') {
      const order = { high: 3, medium: 2, low: 1 };
      filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return filtered;
  }, [tasks, activeCategory, debouncedSearchTerm, sortBy]);

  return (
    <div className="task-page-container">
      <div className="task-page-header">
        <button
          type="button"
          className="secondary-button create-task-button"
          onClick={toggleCreateTaskModal}
        >
          Create new Task
        </button>

        <div className="search-and-sort-box">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for tasks..."
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <span className="icon">
              <img src={searchIcon} alt="search" />
            </span>
          </div>

          <div className="sortby-container">
            <select
              className="sortby-dropdown"
              defaultValue="priority-high"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="none" disabled>
                Sort by
              </option>
              <option value="acending">A-Z</option>
              <option value="decending">Z-A</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="priority-high">Priority High-Low</option>
              <option value="priority-low">Priority Low-High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="category-button-group">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${
              activeCategory === cat ? 'primary-button' : 'transparent-button'
            }`}
          >
            {cat} (
            {cat === 'All'
              ? tasks.length
              : tasks.filter((t) => t.status === cat).length}
            )
          </button>
        ))}
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleCardClick={() => handleCardClick(task)}
            />
          ))
        ) : (
          <p>No tasks found. Create a new task.</p>
        )}
      </div>

      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={toggleCreateTaskModal}
        onTaskCreated={getAllTasks}
      />

      <EditTaskModal
        isOpen={showEditTaskModal}
        onClose={toggleEditTaskModal}
        task={selectedTask}
        onTaskUpdated={getAllTasks}
      />
    </div>
  );
};

export default TasksPage;
