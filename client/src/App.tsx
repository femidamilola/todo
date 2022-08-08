import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo, editTodo } from './API'
import DraggableList from 'react-draggable-list'
import cx from 'classnames'

const App: React.FC = () => {
  interface PlanetListItem {
    name: string;
    description: string;
    subtitle?: boolean;
  }
  interface PlanetProps {
    item: PlanetListItem;
    itemSelected: number;
    dragHandleProps: object;
  }
  interface PlanetState {
    value: number;
  }
  class PlanetItem extends React.Component<PlanetProps, PlanetState> {
    state = {
      value: 0,
    };
  
    _inc() {
      this.setState({
        value: this.state.value + 1,
      });
    }
  
    getDragHeight() {
      return this.props.item.subtitle ? 47 : 28;
    }
  
    render() {
      const { item, itemSelected, dragHandleProps } = this.props;
      const { value } = this.state;
      const scale = itemSelected * 0.05 + 1;
      const shadow = itemSelected * 15 + 1;
      const dragged = itemSelected !== 0;
  
      return (
        <div
        className={cx('item', { dragged })}
          style={{
            transform: `scale(${scale})`,
            boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
          }}
        >
          <div className="dragHandle" {...dragHandleProps} />
          <h2>{item.name}</h2>
          <div>
            {item.description}
          </div>
        </div>
      );
    }
  }
  
  
  const [todos, setTodos] = useState<ITodo[]>([])
  const _onListChange = (newList: any) => {
    setTodos(newList)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

 const handleSaveTodo = async (e: React.FormEvent, formData: ITodo): Promise<void> => {
   e.preventDefault()
   addTodo(formData)
   .then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Task not saved')
    }
    setTodos(data.todos)
  })
  .catch((err) => console.log(err))
}

const handleEditTodo = (todo: ITodo): void => {
  editTodo(todo)
  .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Task not updated')
      }
      setTodos(data.todos)
    })
    .catch((err) => console.log(err))
}

const handleUpdateTodo = (todo: ITodo): void => {
  updateTodo(todo)
  .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Task not updated')
      }
      setTodos(data.todos)
    })
    .catch((err) => console.log(err))
}

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Task not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }


  return (
    <main className='App'>
      <h1>My Tasks</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          editTodo={handleEditTodo}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
      <br />
      Reorder
      <DraggableList<PlanetListItem, void, PlanetItem> list={todos} itemKey="_id" template={PlanetItem} onMoveEnd={(newList: any) => _onListChange(newList)} container={() => document.body}/>
    </main>
  )
}

export default App