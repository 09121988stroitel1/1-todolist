import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    upDateTask: (todoListId: string, taskid: string,newTitleTask: string)=> void
    upDateTodolist:(todoListId: string, newTitle: string)=> void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList = (props: TodoListPropsType) => {

    const upDateTaskHandler = (tID: string, newTitle: string)=> {
        props.upDateTask(props.todoListId, tID, newTitle )
    }
    // const upDateTodolistHandler = (todoListId: string, newTitle: string)=> {
    //
    // }

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
                    <EditableSpan isDoneClasses={isDoneClasses} OLDtitle={i.title} callBack={(newTitle: string)=>upDateTaskHandler(i.id, newTitle)}/>
                    {/*<span className={isDoneClasses}>{i.title}  </span>*/}
                    <button onClick={onClickRemoveTaskHendler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const addTaskHandler = (trimedTitle: string) => {
            props.addTask(props.todoListId, trimedTitle)

    }
    // const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(false)
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyDownAddTaskToTodoListHandletr = (e: KeyboardEvent<HTMLInputElement>) => {
    //     e.key === 'Enter' && addTaskTodoList()
    // }
    // const onClickSetAllFilterHandler = () => {
    //     props.changeFilter('all')
    // }
    // const onClickSetActiveFilterHandler = () => {
    //     props.changeFilter('active')
    // }
    // const onClickSetACompletedFilterHandler = () => props.changeFilter('completed')
    // или так:
    const getOnClickSetFilterHandler = (todoListId: string, filter: filterValuesType) => () => props.changeTodoListFilter(todoListId, filter)
    const removeTodoListHandler =()=> {
        props.removeTodoList(props.todoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan  OLDtitle={props.title} callBack={(newTitle: string)=>props.upDateTodolist(props.todoListId, newTitle)}/>
                {/*{props.title}*/}
            <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler} />
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