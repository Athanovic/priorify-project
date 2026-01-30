import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Bell,
  Database,
  Shield,
  Palette,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function Settings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Ensure initial load also respects stored theme even if not toggled here
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  /* ---------------- NOTIFICATIONS TOGGLE ---------------- */
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notifications", newValue ? "on" : "off");
    showSuccessMessage();
  };

  /* ---------------- DATA HANDLERS ---------------- */
  const handleClearAllData = () => {
    localStorage.removeItem("tasks");
    setShowDeleteConfirm(false);
    showSuccessMessage("All tasks have been deleted!");
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleExportData = () => {
    const tasks = localStorage.getItem("tasks");
    if (!tasks) {
      alert("No tasks to export!");
      return;
    }

    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(tasks);

    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `priorify-tasks-${new Date().toISOString().split('T')[0]}.json`;
    downloadAnchor.click();
    showSuccessMessage("Tasks exported successfully!");
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        JSON.parse(e.target.result);
        localStorage.setItem("tasks", e.target.result);
        showSuccessMessage("Tasks imported successfully!");
        setTimeout(() => window.location.reload(), 1500);
      } catch {
        alert("Invalid JSON file!");
      }
    };
    reader.readAsText(file);
  };

  const showSuccessMessage = (message = "Settings updated successfully!") => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const SettingCard = ({ icon, title, description, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle className="w-6 h-6" />
          <p className="font-semibold">{showSuccess}</p>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full mb-6">
          <SettingsIcon className="w-5 h-5" />
          <span className="font-semibold">Settings & Preferences</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Settings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Customize your Priorify experience
        </p>
      </div>

      {/* Appearance */}
      <SettingCard
        icon={<Palette className="w-6 h-6" />}
        title="Appearance"
        description="Customize how Priorify looks on your device"
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all group"
        >
          <div className="flex items-center gap-3">
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
            <span className="font-semibold text-gray-900 dark:text-white">
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-400'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform transform ${darkMode ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
          </div>
        </button>
      </SettingCard>

      {/* Notifications */}
      <SettingCard
        icon={<Bell className="w-6 h-6" />}
        title="Notifications"
        description="Manage how you receive task notifications"
      >
        <div className="space-y-4">
          <button
            onClick={toggleNotifications}
            className="flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Task Notifications
              </span>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
            </div>
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 px-2">
            {notificationsEnabled
              ? "You'll receive notifications for task creation, updates, and due dates"
              : "Notifications are currently disabled"}
          </p>
        </div>
      </SettingCard>

      {/* Data Management */}
      <SettingCard
        icon={<Database className="w-6 h-6" />}
        title="Data Management"
        description="Export, import, or clear your task data"
      >
        <div className="space-y-3">
          {/* Export */}
          <button
            onClick={handleExportData}
            className="flex items-center gap-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50 transition-all font-semibold"
          >
            <Download className="w-5 h-5" />
            Export All Tasks
          </button>

          {/* Import */}
          <label className="flex items-center gap-3 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900/50 transition-all font-semibold cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Tasks from File
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          {/* Delete */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-3 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-red-200 dark:hover:shadow-red-900/50 transition-all font-semibold"
            >
              <Trash2 className="w-5 h-5" />
              Clear All Tasks
            </button>
          ) : (
            <div className="border-2 border-red-300 dark:border-red-800 rounded-xl p-6 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-900 dark:text-red-300 mb-1">Are you absolutely sure?</p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    This action cannot be undone. All your tasks will be permanently deleted.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClearAllData}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Privacy Notice */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Your Privacy Matters</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All your tasks are stored locally in your browser. We don't collect or store
              any of your data on external servers. Your information stays private and secure
              on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;