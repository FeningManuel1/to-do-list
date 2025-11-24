import { useState, useMemo } from 'react';
import iconCross from '../assets/icon-cross.svg';

type FilterType = 'All' | 'Active' | 'Completed';

function TodoBoard({ isDark, todos, itemsLeft, onToggle, onClear, onDelete }: any) {
  // styles
  const boardBg = isDark ? 'bg-slate-900/80' : 'bg-white';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const footerText = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';

  const [filter, setFilter] = useState<FilterType>('All');

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: any) => {
      switch (filter) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const filterButtons: FilterType[] = ['All', 'Active', 'Completed'];


  return (
    <div className={`mx-auto -mt-6 px-6 max-w-lg ${boardBg} ${textColor}`}>
      {filteredTodos.length === 0 ? (
                <li className="flex items-center gap-4 px-6 py-4 text-slate-400">
                  <div className={`w-6 h-6 rounded-full border ${borderColor}`}></div>
                  No todos yet. Add one above!
                </li>
              ) : (
                filteredTodos.map((todo: any) => {
                  const isCompleted = todo.completed;
                  const checkmarkBg = isCompleted
                    ? 'bg-gradient-to-br from-indigo-400 to-purple-400 border-0'
                    : `border ${borderColor}`;
                return (
            <li key={todo.id} className="flex items-center gap-4 px-6 py-4">
              
              {/* checkbox button */}
              <button
                onClick={() => onToggle(todo.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${checkmarkBg} text-white hover:border-indigo-400`}
              >
                {isCompleted ? '✓' : ''}
              </button>

              {/* todo text */}
              <span className={`flex-1 ${isCompleted ? 'text-slate-500 line-through' : ''}`}>
                {todo.text}
              </span>

              {/* delete button */}
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 hover:scale-110 transition-transform"
                aria-label="Delete todo"
              >
                <img src={iconCross} alt="Delete" className="w-4 h-4" />
              </button>
            </li>
            );
        })
      )}

             {/* footer */}
      <div className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm ${footerText}`}>

        {/* items left count */}
        <span>{itemsLeft} items left</span>

        {/* filter buttons */}
        <div className="flex items-center gap-4">
          {filterButtons.map((btn) => {
            const isActive = filter === btn;
            const btnColor = isActive
              ? 'text-indigo-400'
              : isDark
                ? 'hover:text-white'
                : 'hover:text-slate-900';

            return (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`font-semibold ${btnColor}`}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* clear completed button */}
        <button
          onClick={onClear}
          className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
        >
          Clear Completed
        </button>
       </div>
    </div>
  );
}

      
    
export default TodoBoard