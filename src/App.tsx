import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


// Create
// Rid
// Update
// Delete
export type filterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML & CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ]
    )

    const [filter, setFilter] = useState<filterValuesType>('active')

    const removeTask = (id: string) => {
        setTasks(tasks.filter((i) => i.id !== id))
    }
    const changeTodoListFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ?
            {...t, isDone: isDone} : t))
    }

    const getFilterTasksForRender = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(i => !i.isDone)
            case 'completed':
                return tasks.filter(i => i.isDone)
            default:
                return tasks
        }
    }

    const filterTasksForRender: Array<TaskType> = getFilterTasksForRender()


    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={filterTasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
