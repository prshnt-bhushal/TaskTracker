import { useNavigate } from 'react-router-dom';
import TaskCard from '../../components/Cards/TaskCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const task = {
    id: 3,
    title: 'Send a meme to your boss (optional, risky, hilarious)',
    status: 'pending',
    priority: 'low',
    dueDate: new Date().toISOString().split('T')[0],
  };
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Task Tracker</h1>
          <p>
            Manage your tasks efficiently and effectively with our intuitive
            task management system
          </p>
          <div className="form-row">
            <a
              href="https://github.com/prshnt-bhushal/TaskTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="transparent-anchor"
            >
              Get Code
            </a>
            <button
              onClick={() => navigate('/tasks')}
              className="primary-button"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="card-container">
          <TaskCard task={task} />
        </div>
      </section>
      <section className="how-to-section">
        <h2>Getting Started</h2>
        <p
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          Start tracking your tasks in just 4 simple steps
        </p>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Clone the repository:</h3>
              <p>
                Start by cloning the repository from GitHub to your local
                machine
              </p>
              <div className="code-block">
                <code>
                  git clone https://github.com/prshnt-bhushal/TaskTracker.git{' '}
                  <br /> cd TaskTracker
                </code>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Install Dependencies</h3>
              <p>
                Once you have cloned the repository, navigate to your project
                directory and install all required packages
              </p>
              <div className="code-block">
                <code>npm install</code>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Start Mock Database</h3>
              <p>
                Run the JSON Server to set up your mock database on port 5000
              </p>
              <div className="code-block">
                <code>json-server --watch db.json --port 5000</code>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Launch the Application</h3>
              <p>
                In a new terminal window, start the React development server
              </p>
              <div className="code-block">
                <code>npm run dev</code>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Start Managing Your Tasks</h3>
              <p>
                Open your browser to <strong>http://localhost:5173</strong> and
                start creating tasks!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
