import {useState, useMemo} from "react";

function useTaskFilters(tasks = []) {
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [showCompleted, setShowCompleted] = useState(true);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (!showCompleted && task.completed) return false;

            if(priorityFilter !== "all" && task.priority !== priorityFilter){
                return false;
            }

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                return (
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query)
                );
            }

            return true;
        });
    }, [tasks, searchQuery, priorityFilter, showCompleted]);

    const stats = useMemo(() => {
        return {
            total: tasks.length,
            completed: tasks.filter((t) => t.completed).length,
            highPriority: tasks.filter(
                (t) => t.priority === "high" && !t.completed
            ).length,
        };
    }, [tasks]);

    return {
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        showCompleted,
        setShowCompleted,
        filteredTasks,
        stats,
    };
}

export default useTaskFilters;
