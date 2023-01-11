import React, {ChangeEvent, useState} from 'react';
type PropsType = {
    OLDtitle: string
    callBack: (newTitle: string)=> void
    isDoneClasses?: string
}
const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setnewTitle]= useState('')

    const onDoubleClickHandler = ()=> {
        setEdit(!edit)
        setnewTitle(props.OLDtitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setnewTitle(e.currentTarget.value)
    }
    const onBlurClickHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setEdit(!edit)
        props.callBack(newTitle)

    }



    return (
        <>
            {edit
                ?  <span className={props.isDoneClasses} onDoubleClick={onDoubleClickHandler}>{props.OLDtitle}  </span>
                : <input onBlur={onBlurClickHandler} onChange={onChangeHandler} value={newTitle} autoFocus/>}
        </>


    );
};

export default EditableSpan;