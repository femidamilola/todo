import React, { useState } from 'react'

type Props = TodoProps & {
    editTodo: (todo: ITodo) => void
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, editTodo, deleteTodo }) => {
    
    const [edit, SetEdit] = useState(false)
    const [name, setName] = useState(todo.name)
    const [desc, setDesc] = useState(todo.description)
    const checkTodo: string = (todo.status && !edit) ? `line-through` : ''
    const inputStyle = {
        width: '90%',
        display: 'block',
        color: edit ? '#000' : '#fff',
        backgroundColor: edit ? '#fff' : '#444',
        border: edit ? 'none' : 'none',
        fontSize: '20px'
    }
    const submit = () => {
        const req = {
            _id: todo._id,
            name: name,
            description: desc,
            status: todo.status,
        }
        editTodo(req)
        SetEdit(false)
    }

    return (
    <>
    <div className='Card'>
        <div className='Card--text'>
            <input value={name} disabled={!edit} style={inputStyle} className={checkTodo} onChange={(e)=>setName(e.target.value)}/>
            <input value={desc} disabled={!edit} style={inputStyle} className={checkTodo} onChange={(e)=>setDesc(e.target.value)}/>
            <button hidden={!edit} onClick={submit}>
                Submit
            </button>
        </div>
        <div className='Card--button'>
            <button
                onClick={() => updateTodo(todo)}
                className={todo.status ? `hide-button` : 'Card--button__done'}
            >
            Mark as done
            </button>

            <button hidden={edit} onClick={()=>{SetEdit(true)}}>
                Edit
            </button>
            <button hidden={!edit} onClick={()=>{SetEdit(false)}}>
                Cancel
            </button>
            <button
                onClick={() => deleteTodo(todo._id)}
                className='Card--button__delete'
            >
            Delete
            </button>
        </div>
    </div>

    </>
  )
}

export default Todo