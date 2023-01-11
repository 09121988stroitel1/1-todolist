import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';


// Create
// Rid
// Update
// Delete
export type filterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}

type Taskstype = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<Taskstype>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });



    const upDateTask=(todoListId: string, taskid: string,newTitleTask: string)=> {
    setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(el=> el.id === taskid ? {...el, title: newTitleTask} : el)]})
}

const upDateTodolist=(todoListId: string, newTitle: string)=> {
    setTodolists([...todoLists.map(el=> el.id === todoListId ? {...el, title: newTitle} : el)])

}

    const removeTask = (todoListId: string, taskid: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskid)})
    }
    const changeTodoListFilter = (todoListId: string, filter: filterValuesType) => {
        setTodolists(todoLists.map(el => el.id === todoListId ? {...el, filter: filter} : el))
    }

    const addTask = (todoListId: string, title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const addTodoList = (title: string) => {
        let newId= v1()
        let newTodoList: TodoListType = {id: newId, title: title, filter: 'all'}
        setTodolists([...todoLists, newTodoList])
         setTasks({...tasks, [newId]: []})
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ?
                {...t, isDone: newIsDone} : t)
        })
    }

    const removeTodoList = (todoListId: string) => {
        setTodolists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]

    }


    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            {
                todoLists.map((t) => {
                    let tasksForTodolist = tasks[t.id];

                    if (t.filter === 'active') {
                        tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                    }
                    if (t.filter === 'completed') {
                        tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                    }


                    return (
                        <TodoList
                            key={t.id}
                            todoListId={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={t.filter}
                            removeTodoList={removeTodoList}
                            upDateTask={upDateTask}
                            upDateTodolist={upDateTodolist}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;
