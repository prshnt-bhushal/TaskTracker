const SERVER_URL = 'http://localhost:5000';

/* ------------Json Server fallback API with localStorage backup ---------------- */
const LS_KEY = 'tasktracker_tasks';
//today date + 2 days for seed data
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 2);

const SEED_TASKS = [
  {
    id: 'k66l',
    title: 'Fix Vercel deployment — localStorage fallback for json-server',
    dueDate: '2026-06-06',
    status: 'completed',
    priority: 'high',
    description:
      'json-server only runs locally, so Vercel had no backend. Added localStorage fallback in api.js so the app works in production without any server.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a12b',
    title: 'Feed the office plant before it files a complaint',
    dueDate: tomorrow.toISOString().split('T')[0],
    status: 'to-do',
    priority: 'medium',
    description:
      'Plant HR has warned me twice already. Must water the poor guy before lunch.',
    createdAt: '2025-10-18T04:15:32.511Z',
  },
  {
    id: 'k66l',
    title: 'Build a tiny robot that waters the office plant automatically',
    dueDate: today.toISOString().split('T')[0],
    status: 'to-do',
    priority: 'medium',
    description:
      'Tired of Plant HR complaints. Time to build an Arduino-powered auto-waterer. Bonus points if it sends a Slack message when the soil is dry.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'b34c',
    title: "Fix bug that only appears on boss's laptop",
    dueDate: today.toISOString().split('T')[0],
    status: 'pending',
    priority: 'high',
    description:
      'Works fine on my machine™ but somehow breaks every time the boss opens it.',
    createdAt: '2025-10-18T05:02:45.231Z',
  },
];

function lsGetTasks() {
  const raw = localStorage.getItem(LS_KEY);
  if (raw === null) {
    // First visit — seed with db.json data
    localStorage.setItem(LS_KEY, JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  }
  return JSON.parse(raw);
}

function lsSaveTasks(tasks) {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
}

function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

let _serverAvailable = null; // null = unknown, true/false = cached result

async function isServerAvailable() {
  if (_serverAvailable !== null) return _serverAvailable;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    await fetch(`${SERVER_URL}/tasks`, { signal: controller.signal });
    clearTimeout(timeout);
    _serverAvailable = true;
  } catch {
    _serverAvailable = false;
  }
  return _serverAvailable;
}

/* ------------Json Server fallback API with localStorage backup ---------------- */

export const fetchTasks = async () => {
  if (await isServerAvailable()) {
    try {
      const res = await fetch(`${SERVER_URL}/tasks`);
      return await res.json();
    } catch {
      _serverAvailable = false;
    }
  }
  return lsGetTasks();
};

export const createTask = async (task) => {
  if (await isServerAvailable()) {
    try {
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch {
      _serverAvailable = false;
    }
  }
  // localStorage path
  const newTask = {
    ...task,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  lsSaveTasks([...lsGetTasks(), newTask]);
  return newTask;
};

export const updateTask = async (id, updates) => {
  if (await isServerAvailable()) {
    try {
      const res = await fetch(`${SERVER_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return await res.json();
    } catch {
      _serverAvailable = false;
    }
  }
  // localStorage path
  const tasks = lsGetTasks().map((t) =>
    t.id === id ? { ...t, ...updates } : t,
  );
  lsSaveTasks(tasks);
  return tasks.find((t) => t.id === id);
};

export const deleteTask = async (id) => {
  if (await isServerAvailable()) {
    try {
      await fetch(`${SERVER_URL}/tasks/${id}`, { method: 'DELETE' });
      return;
    } catch {
      _serverAvailable = false;
    }
  }
  // localStorage path
  lsSaveTasks(lsGetTasks().filter((t) => t.id !== id));
};
