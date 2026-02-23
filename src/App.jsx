import { useState, useRef } from 'react'

const initialTasks = [
  { id: 1, description: 'Comprar pão', checked: false },
  { id: 2, description: 'Passear', checked: false },
  { id: 3, description: 'Cozinhar', checked: false },
]

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [input, setInput] = useState('')
  const nextId = useRef(4)
  const inputRef = useRef(null)

  const checkedCount = tasks.filter(t => t.checked).length

  function addTask(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setTasks(prev => [...prev, { id: nextId.current++, description: trimmed, checked: false }])
    setInput('')
    inputRef.current?.focus()
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, checked: !task.checked } : task)
    )
  }

  function deleteChecked() {
    setTasks(prev => prev.filter(task => !task.checked))
  }

  return (
    <main>
      <div className="header">
        <h1>Minhas Tarefas</h1>
        {tasks.length > 0 && (
          <span className="counter">
            {checkedCount} de {tasks.length} concluída{checkedCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <form className="add-task-form" onSubmit={addTask}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Adicionar nova tarefa..."
          autoComplete="off"
        />
        <button type="submit" aria-label="Adicionar tarefa">
          <span className="btn-icon">+</span>
          <span className="btn-text">Adicionar</span>
        </button>
      </form>

      <section className="todo-list-section">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✓</span>
            <p>Tudo feito! Adicione novas tarefas acima.</p>
          </div>
        ) : (
          <ul id="todo-list">
            {tasks.map(task => (
              <li key={task.id} className={task.checked ? 'checked' : ''}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="custom-checkbox" />
                  <span className="task-text">{task.description}</span>
                </label>
                <button
                  className="remove-btn"
                  onClick={() => removeTask(task.id)}
                  title="Remover tarefa"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {checkedCount > 0 && (
          <div className="list-footer">
            <button className="clear-btn" onClick={deleteChecked}>
              Limpar concluídas ({checkedCount})
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
