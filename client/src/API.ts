import axios, { AxiosResponse } from "axios"

const baseUrl: string = `/`

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + "/todos"
        )
        return todos
    } catch (error) {
        console.log(error)
        throw new Error("An error occurred")
    }
}

export const addTodo = async (
        formData: ITodo
    ): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "_id"> = {
            name: formData.name,
            description: formData.description,
            status: false,
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/todo/add",
            todo
        )
        return saveTodo
    } catch (error) {
        console.log(error)
        throw new Error("An error occurred")
    }
}

export const updateTodo = async (
        todo: ITodo
    ): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true,
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/todo/edit/${todo._id}`,
            todoUpdate
        )
      return updatedTodo
    } catch (error) {
        console.log(error)
        throw new Error("An error occurred")
    }
}
 
export const editTodo =  async (
        todo: ITodo
    ): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "name" | "description"> = {
            name: todo.name,
            description: todo.description
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/todo/edit/${todo._id}`,
            todoUpdate
        )
    return updatedTodo
    } catch (error) {
        console.log(error)
        throw new Error("An error occurred")
    }
}

export const deleteTodo = async (
        _id: string
    ): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/todo/delete/${_id}`
        )
        return deletedTodo
    } catch (error) {
        console.log(error)
        throw new Error("An error occurred")
    }
}