import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    changeTodoListFilter: (todoListId: string, filter: filterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: filterValuesType
    todoListId: string
    removeTodoList: (todoListId: string) => void
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
                props.removeTask(props.todoListId, i.id)
            }
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoListId, i.id, e.currentTarget.checked)
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
        if (trimedTitle) {
            props.addTask(props.todoListId, trimedTitle)
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
    const getOnClickSetFilterHandler = (todoListId: string, filter: filterValuesType) => () => props.changeTodoListFilter(todoListId, filter)
    const inputClasses = error ? 'inputError' : undefined
    const errorMessageStyle = {color: 'hotpink', margin: '0px'}
    const errorMessage =
        error && <p style={errorMessageStyle}>Please, enter task title</p>
    const removeTodoListHandler =()=> {
        props.removeTodoList(props.todoListId)
    }


    return (
        <div>
            <h3>
                {props.title}
            <button onClick={removeTodoListHandler}>x</button>
            </h3>
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
                <button className={props.filter === 'all' ? 'activeFilter' : ''}
                        onClick={getOnClickSetFilterHandler(props.todoListId, 'all')}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={getOnClickSetFilterHandler(props.todoListId,'active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={getOnClickSetFilterHandler(props.todoListId,'completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;