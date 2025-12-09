import { useState, useMemo } from 'react';
import { Reorder } from "framer-motion";
import iconCross from '../assets/icon-cross.svg';

type FilterType = 'All' | 'Active' | 'Completed';

function TodoBoard({ isDark, todos, itemsLeft, onToggle, onClear, onDelete, onReorder }: any) {
  const boardBg = isDark ? 'bg-slate-900/80' : 'bg-white';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const footerText = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-500';

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

  // Handle reordering
  const handleReorder = (reorderedTodos: any[]) => {
    if (onReorder) {
      const newOrder = reorderedTodos.map(todo => todo.id);
      onReorder(newOrder);
    }
  };

  return (
    <div className={`mx-auto rounded overflow-hidden ${boardBg} ${textColor} shadow-2xl w-[calc(100%-3rem)] max-w-lg lg:w-full lg:max-w-lg`}>
      <div className="h-[50vh] overflow-y-auto scrollable">
        {filteredTodos.length === 0 ? (
          <div className="flex items-center gap-4 py-4 px-6 text-slate-400">
            <div className={`w-6 h-6 rounded-full border ${borderColor}`}></div>
            No todos yet. Add one above!!
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={filteredTodos} 
            onReorder={handleReorder}
            className="h-full"
          >
            {filteredTodos.map((todo: any) => {
              const isCompleted = todo.completed;
              const checkmarkBg = isCompleted
                ? 'bg-gradient-to-br from-indigo-400 to-purple-400 border-0'
                : `border ${borderColor}`;
              
              return (
                <Reorder.Item 
                  key={todo.id} 
                  value={todo}
                  className="cursor-grab active:cursor-grabbing border-slate-200 dark:border-slate-700"
                  whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center gap-4 py-4 px-4 sm:px-6">
                    
                    {/* checkbox button */}
                    <button
                      onClick={() => onToggle(todo.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${checkmarkBg} text-white hover:border-indigo-400`}
                    >
                      {isCompleted ? '✓' : ''}
                    </button>

                    {/* todo text */}
                    <span className={`flex-1 ${isCompleted ? 'text-slate-500 line-through' : ''} text-sm sm:text-base`}>
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
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}
      </div>

      {/* Bottom Nav Mobile View */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 items-center p-3 sm:p-4 text-sm ${footerText} border-slate-200 dark:border-slate-700`}>
        {/* items left count */}
        <div className="text-xs sm:text-sm px-2 sm:px-0">
          <span>{itemsLeft}</span> items left
        </div>

        {/* filter buttons*/}
        <div className="hidden sm:flex gap-4 justify-center">
          {filterButtons.map((btn) => {
            const isActive = filter === btn;
            const btnColor = isActive
              ? 'text-indigo-400'
              : isDark
                ? 'hover:text-white cursor-pointer'
                : 'hover:text-slate-900 cursor-pointer';

            return (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`font-medium ${btnColor}`}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* clear completed button */}
        <div className="text-right">
          <button
            onClick={onClear}
            className={`text-xs sm:text-sm ${isDark ? 'hover:text-white' : 'hover:text-slate-900'} cursor-pointer px-2 sm:px-0`}
          >
            Clear Completed
          </button>
        </div>

        {/*filter buttons for mobile view*/}
        <div className="col-span-2 sm:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-center gap-4">
            {filterButtons.map((btn) => {
              const isActive = filter === btn;
              const btnColor = isActive
                ? 'text-indigo-400'
                : isDark
                  ? 'hover:text-white cursor-pointer'
                  : 'hover:text-slate-900 cursor-pointer';

              return (
                <button
                  key={btn}
                  onClick={() => setFilter(btn)}
                  className={`font-medium ${btnColor}`}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoBoard;