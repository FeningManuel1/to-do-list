import { useState } from 'react'
import bgDesktopDark from './assets/bg-desktop-dark.jpg'
import bgDesktopLight from './assets/bg-desktop-light.jpg'
import bgMobileDark from './assets/bg-mobile-dark.jpg'
import bgMobileLight from './assets/bg-mobile-light.jpg'
import iconMoon from './assets/icon-moon.svg'
import iconSun from './assets/icon-sun.svg'
import Hero from './components/Hero'
import TodoBoard from './components/TodoBoard'
import TodoInputCard from './components/TodoInputCard'

// list of filter buttons
const filterButtons = ['All', 'Active', 'Completed']

function App() {
  // state for dark/light mode
  const [theme, setTheme] = useState('dark')
  // state for the input field
  const [inputValue, setInputValue] = useState('')
  // state for all todos
  const [todos, setTodos] = useState([] as Array<{id: number, text: string, completed: boolean}>)

  // check if dark mode
  const isDark = theme === 'dark'
  
  // pick the right background image set based on theme
  const heroBackgrounds = {
    desktop: isDark ? bgDesktopDark : bgDesktopLight,
    mobile: isDark ? bgMobileDark : bgMobileLight
  }
  
  // pick the right icon
  let themeIcon = iconSun
  if (!isDark) {
    themeIcon = iconMoon
  }

  // count how many todos are not done
  let itemsLeft = 0
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].completed) {
      itemsLeft = itemsLeft + 1
    }
  }

  // function to add a new todo
  function addTodo() {
    if (inputValue.trim() === '') {
      return
    }
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  // function to toggle todo completed/not completed
  function toggleTodo(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // function to clear all completed todos
  function clearCompleted() {
    const activeTodos = todos.filter(todo => !todo.completed)
    setTodos(activeTodos)
  }

  // function to delete a single todo
  function deleteTodo(id: number) {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  // function to switch theme
  function switchTheme() {
    if (isDark) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div className={isDark ? 'bg-slate-950 min-h-screen' : 'bg-slate-100 min-h-screen'}>
      <Hero 
        isDark={isDark}
        bgDesktop={heroBackgrounds.desktop}
        bgMobile={heroBackgrounds.mobile}
        themeIcon={themeIcon}
        onThemeClick={switchTheme}
      >
        <TodoInputCard
          isDark={isDark}
          value={inputValue}
          onChange={setInputValue}
          onAdd={addTodo}
        />
      </Hero>
      <div className="flex justify-center pt-8">
      <TodoBoard
        isDark={isDark}
        todos={todos}
        itemsLeft={itemsLeft}
        filterButtons={filterButtons}
        onToggle={toggleTodo}
        onClear={clearCompleted}
        onDelete={deleteTodo}
      />
      </div>
    </div>
    
  )
}

export default App
