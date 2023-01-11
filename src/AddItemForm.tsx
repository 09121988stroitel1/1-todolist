import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack: (trimedTitle: string)=> void
}


const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskToTodoListHandletr = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskTodoList()
    }
    const addTaskTodoList = () => {
        const trimedTitle = title.trim()
        if (trimedTitle) {
            props.callBack(trimedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const inputClasses = error ? 'inputError' : undefined
    const errorMessageStyle = {color: 'hotpink', margin: '0px'}
    const errorMessage =
        error && <p style={errorMessageStyle}>Please, enter task title</p>

    return (
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
    );
};

export default AddItemForm;


// const upDateTodolist=(todoListId: string, newTitle: string)=> {
//     setTodolists([...todoLists.map(el=> el.id === todoListId ? {...el, title: newTitle} : el)])
//
// }

// const upDateTask=(todoListId: string, taskid: string,newTitleTask: string)=> {
//     setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(el=> el.id === taskid ? {...el, title: newTitleTask} : el)]})
// }