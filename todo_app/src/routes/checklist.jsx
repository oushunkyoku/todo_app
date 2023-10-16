import { getTodos } from "../api/todo"
import TodoCard from "../components/TodoCard"
import { useState, useEffect } from "react";
import "../style/todolist.css";

export default function CheckList(){

    const [todolist, setTodolist] = useState([]);
    const [updated,setUpdated] = useState(false);

    useEffect(()=>{
        const fetchTodoList = async () => {
            const [status,data] = await getTodos();
            console.log(data,11);
            const doneList = [];
            for (let key in data){
                if(data[key].done === "true"){
                    doneList.push({id:key,...data[key]});
                };
            };
            setTodolist(doneList);
        };
        fetchTodoList();
    },[updated]);

    return (
        <div className="ToDoList">
            {todolist.map((item) => {
                return (
                    <TodoCard key={item.id} todo={item} setUpdated={setUpdated}/>
                )
            })}
        </div>
    )
    
}