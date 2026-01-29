import useLocalStorage from "./useLocalStorage";

function useSettings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage(
    "notificationsEnabled",
    true
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const resetApp = () => {
    localStorage.clear();
    window.location.reload();
  };

  return {
    theme,
    notificationsEnabled,
    toggleTheme,
    toggleNotifications,
    resetApp,
  };
}

export default useSettings;
