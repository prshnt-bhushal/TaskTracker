   # TaskTracker

   A modern, fun, and efficient task‑tracking application built with React.  
   It allows you to create, edit, search, filter and sort your tasks with a humourful twist 🎉

   ---

   ## 🚀 Live Demo  
   Take a look at the live version: [TaskTracker – Vercel](https://task‑tracker‑iota‑drab.vercel.app)
   
    > ⚠️ **Disclaimer:** The JSON Server has not been hosted yet.  
    > You can clone this project and follow these steps to run it locally.

   ---

   ## 🔍 Features  
   - Add new tasks, each with title, due date, status (todo / pending / completed), priority (low / medium / high), description.  
   - Edit existing tasks in a modal with pre‑filled data.  
   - Delete tasks with a confirmation prompt.  
   - Real‑time search with debounce (prevents filtering on every keystroke).  
   - Filter tasks by category (All / pending / completed).  
   - Sort tasks by title (A‑Z / Z‑A), created date (latest / oldest), priority (high‑low / low‑high), and “closest to deadline”.  
   - Humourful sample tasks for visitors to get a quick feel of the app.  
   - Built using React hooks (`useState`, `useEffect`, `useMemo`), custom `useDebounce` hook for optimized search.

   ---

   ## 🛠️ Tech Stack  
   - **Frontend**: React  
   - **Styling**: CSS (plain or modules)  
   - **State & Effects**: `useState`, `useEffect`, `useMemo`, custom `useDebounce`  
   - **Mock Backend**: `json‑server` with `db.json` for demo / development  
   - **Bundler / Build**: Vite  
   - **Deployment**: Vercel

   ---

   ## 🧑‍💻 Getting Started  

   ### Prerequisites  
   - Node.js (v14+ recommended)  
   - npm or yarn  

   ### Installation  
   1. Clone the repository  
      ```bash
      git clone https://github.com/prshnt-bhushal/TaskTracker.git
      cd TaskTracker
      ```  
   2. Install dependencies  
      ```bash
      npm install
      # or
      yarn install
      ```  
   3. Run mock server (for tasks backend)  
      ```bash
      npx json-server --watch db.json --port 5000
      ```  
   4. Start the development server  
      ```bash
      npm run dev
      # or
      yarn dev
      ```  
   5. Open your browser at `http://localhost:3000` (or your Vite dev address).

   ### Building for Production  
   ```bash
   npm run build
   # or
   yarn build
   ```  
   Then deploy the `dist/` folder to your preferred hosting provider (e.g., Vercel, Netlify).

   ---

   ## 🔧 Usage Tips  
   - On the landing page, you’ll see a sample humorous task — great for showing off the app’s vibe.  
   - Use the search bar to filter tasks by title (debounced).  
   - Use the category buttons to toggle between All / pending / completed.  
   - Use the sort dropdown to try out all sort options, including “closest to deadline”.  
   - Click on any task card to open the Edit modal, where you can update or delete the task.

   ---

   ## 🧾 Folder Structure  
   ```text
   src/
   ├── assets/
   │    └── Icons/
   │         ├── search-icon.svg
   │         └── close-icon.svg
   ├── components/
   │    ├── Cards/
   │    ├── Modal/
   │    ├── Navbar/
   │    └── Footer/
   ├── pages/
   │    ├── LandingPage/
   │    └── TaskPage/
   │         └── TasksPage.jsx
   ├── services/
   │    └── api.js
   └── index.js
   ```

   ---
   
   ## 💡 Future Improvements  
   - Add user authentication & multiple user support  
   - Add categories / tags for tasks  
   - Add recurring / repeating tasks  
   - Drag & drop task ordering  
   - Push notifications for deadlines  
   - Dark mode / theming  
   - Export / Sync to Google Calendar

   ---

   ## 🙏 Credits  
   Built by **Prashant Bhushal** ([@prshnt‑bhushal](https://github.com/prshnt-bhushal))

   ---
