import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeTodoListFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: filterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksItem = props.tasks.length
        ? props.tasks.map((i) => {
            const onClickRemoveTaskHendler = () => {
                props.removeTask(i.id)
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(i.id, e.currentTarget.checked)
            }
            const isDoneClasses = i.isDone ? 'isDone' : 'notIsDone'
            return (
                <li key={i.id}>
                    <input type="checkbox"
                           checked={i.isDone}
                           onChange={onChangeSetTaskStatus}

                    />
                    <span className={isDoneClasses}>{i.title}  </span>
                    <button onClick={onClickRemoveTaskHendler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const addTaskTodoList = () => {
        const trimedTitle = title.trim()
        if(trimedTitle) {
            props.addTask(trimedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
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
    const getOnClickSetFilterHandler = (filter: filterValuesType) => () => props.changeTodoListFilter(filter)
    const inputClasses = error ? 'inputError' : undefined
    const errorMessageStyle = {color: 'hotpink', margin: '0px'}
    const errorMessage =
        error && <p style={errorMessageStyle}>Please, enter task title</p>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskToTodoListHandletr}
                    className={inputClasses}
                />
                <button onClick={addTaskTodoList}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button className={props.filter === 'all'? 'activeFilter' : ''} onClick={getOnClickSetFilterHandler('all')}>All</button>
                <button className={props.filter === 'active'? 'activeFilter' : ''} onClick={getOnClickSetFilterHandler('active')}>Active</button>
                <button className={props.filter === 'completed'? 'activeFilter' : ''} onClick={getOnClickSetFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;