import { Router } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'
 
const router: Router = Router()

router.get('/todos', getTodos)

router.post('/todo/add', addTodo)

router.put('/todo/edit/:id', updateTodo)

router.delete('/todo/delete/:id', deleteTodo)

export default router