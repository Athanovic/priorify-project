import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Bell,
} from "lucide-react";

function Settings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notifications") !== "off"
  );

  /* ---------------- THEME TOGGLE ---------------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ---------------- NOTIFICATIONS TOGGLE ---------------- */
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notifications", newValue ? "on" : "off");

    alert(
      newValue
        ? "Task notifications enabled"
        : "Task notifications disabled"
    );
  };

  /* ---------------- DATA HANDLERS ---------------- */
  const handleClearAllData = () => {
    localStorage.removeItem("priorify-tasks");
    setShowDeleteConfirm(false);
    alert("All tasks have been deleted!");
  };

  const handleExportData = () => {
    const tasks = localStorage.getItem("priorify-tasks");
    if (!tasks) {
      alert("No tasks to export!");
      return;
    }

    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(tasks);

    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = "priorify-tasks.json";
    downloadAnchor.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        JSON.parse(e.target.result);
        localStorage.setItem("priorify-tasks", e.target.result);
        alert("Tasks imported successfully!");
        window.location.reload();
      } catch {
        alert("Invalid JSON file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-10 h-10" />
        <h1 className="text-4xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* APPEARANCE */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Appearance</h2>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

          <button
            onClick={toggleNotifications}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            <Bell size={18} />
            {notificationsEnabled
              ? "Disable Task Notifications"
              : "Enable Task Notifications"}
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Controls alerts for task creation, updates, and deletion.
          </p>
        </div>

        {/* DATA MANAGEMENT */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Data Management</h2>

          <div className="space-y-4">
            {/* EXPORT */}
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              <Download size={16} />
              Export Tasks
            </button>

            {/* IMPORT */}
            <label className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer w-fit">
              <Upload size={16} />
              Import Tasks
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>

            {/* DELETE */}
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                <Trash2 size={16} />
                Clear All Tasks
              </button>
            ) : (
              <div className="border border-red-300 p-4 rounded-md">
                <p className="mb-2">Are you sure?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearAllData}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
