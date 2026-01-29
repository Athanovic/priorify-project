import {useEffect} from "react";
import useLocalStorage from "./useLocalStorage";
import useNotifications from "./useNotifications";

function useTasks() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [lastNotifiedDate, setLastNotifiedDate] = useLocalStorage("lastDueNotification", null);

    const {notify} = useNotifications();
    
    //Notify for due tasks
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        //Prevent duplicate notifications in the same day
        if (lastNotifiedDate === today) return;

        const dueToday = tasks.filter(
            (task) => task.dueDate === today && task.completed !== true
        );

        if (dueToday.length > 0) {
            notify(`You have ${dueToday.length} task(s) due today`);
            setLastNotifiedDate(today);
        }
    }, [tasks, lastNotifiedDate, notify, setLastNotifiedDate]);
    
    //Add task
    const addTask = (task) => {
        setTasks([...tasks, task]);
        notify("Task added successfully");
    };
    
    //Update task
    const updateTask = (id, updatedData) => {
        setTasks(
            tasks.map((task) => 
                task.id === id ? { ...task, ...updatedData } : task
            )
        );
        notify("Task updated");
    };
    
    //Delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        notify("Task deleted");
    };
    
    //Toggle task completion
    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
    };
}

export default useTasks;