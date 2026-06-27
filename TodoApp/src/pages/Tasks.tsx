import { useEffect, useState } from "react";


function Tasks(){
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch('http://localhost:8080/api/task',{
                     method: "GET"
                    })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
                const data = await response.json()
                setTaskList(data.data)
            } catch (err) {
                console.error(err)
                setError(err.message)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchTodos()
    },[])

    if (error){ 
        return <div>{error}</div>
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return(
        <div className="gap-5 flex flex-col w-full h-100 min-h-[10vh] items-center justify-top pt-5 pb-5 overflow-y-scroll scrollbar-none">
            {taskList.map((task, index) => {
                return (
                    <div key={index} className="w-10/12 h-24 bg-slate-800 shrink-0 rounded-3xl">
                        <section>{task.time_begin}</section>
                        <section>{task.body}</section>
                    </div>
                )
            })}
        </div>
    );
}export default Tasks;