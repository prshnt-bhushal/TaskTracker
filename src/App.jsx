import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import { LandingPage, TasksPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
