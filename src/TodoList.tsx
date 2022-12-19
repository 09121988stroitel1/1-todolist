import React, {ChangeEvent,  KeyboardEvent, useState} from 'react';
import {filterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id: string)=> void
    changeFilter:(filter: filterValuesType)=> void
    addTask:(title: string)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle]= useState<string>('')
    const tasksItem = props.tasks.length
    ? props.tasks.map((i)=> {

        const onClickRemoveTaskHendler = () => {
            props.removeTask(i.id)
        }
        return (
            <li key={i.id}>
                <input type="checkbox" checked={i.isDone}/>
                <span>{i.title}</span>
                <button onClick={onClickRemoveTaskHendler}>x</button>
            </li>


            )
    })
        : <span>Tasks list is empty</span>

    const addTaskTodoList = ()=>{
        props.addTask(title)
        setTitle('')
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskToTodoListHandletr = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskTodoList()
    }
    // const onClickSetAllFilterHandler = () => {
    //     props.changeFilter('all')
    // }
    // const onClickSetActiveFilterHandler = () => {
    //     props.changeFilter('active')
    // }
    // const onClickSetACompletedFilterHandler = () => props.changeFilter('completed')
    // или так:
    const getOnClickSetFilterHandler = (filter: filterValuesType) =>()=> props.changeFilter(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler }
                    onKeyDown={onKeyDownAddTaskToTodoListHandletr}
                />
                <button onClick={addTaskTodoList}>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button onClick={getOnClickSetFilterHandler('all')}>All</button>
                <button onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button onClick={getOnClickSetFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;