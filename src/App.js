import './App.css';
import { useState, useRef, useEffect } from 'react'

import Calender from './Calendar'
import TodoList from './TodoList'

function App() {
  // 今日の日付
  const today = new Date();
  // データベースから取得してきたタスク情報
  const [todos, setTodos] = useState([]);
  // カレンダーコンポーネントで選択された日付
  const [selectedDate, setSelectedDate] = 
    useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  
  // 
  const todoNameRef = useRef();


  useEffect(() => {
    // 選択されている日付が変更されたらデータベースからタスクを取得
    fetchTaskData();

  }, [selectedDate]);
  
   const fetchTaskData = () => {

    fetch('http://localhost:8080/tasks')
      .then(response => response.json())
      .then(tasks => {
        // selectedDateと同じ日付を持つタスクのみをフィルタリングする
        const filteredTasks = tasks.filter(task => {
          // tasks内の各タスクの日付を取得し、selectedDateと比較する
          const taskDate = new Date(task.date); // taskの日付をDateオブジェクトに変換する
          const selectedDateObj = new Date(selectedDate); // selectedDateをDateオブジェクトに変換する
          return taskDate.toDateString() === selectedDateObj.toDateString(); // 日付が一致する場合のみtrueを返す
        });
        setTodos(filteredTasks); // オリジナルのtasksではなく、フィルタリングされたtasksをセットする
      })
      .catch(error => {
        console.error('Error fetching tasks data:', error);
        setTodos([]);
      });
  }
  
  const addTaskToDatabase = (task) => {
    fetch('http://localhost:8080/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(newTask => {
      console.log('New task added:', newTask);
      fetchTaskData();
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  const updateTask = (task) => {
    fetch('http://localhost:8080/tasks/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => {
      if (response.ok) {
        fetchTaskData();
      } else {
        console.error('Failed to update stock');
      }
    })
    .catch(error => {
      console.error('Error updating stock:', error);
    });
  };
  
  // タスクの完了チェック関数
  // 引数 id ... どのタスクにチェックを入れるか
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
    updateTask(todo);
  }

  // フォームから送信された際の処理
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newStock = {
      name: formData.get('name'),
      date: new Date(selectedDate)
    };
    addTaskToDatabase(newStock);
  }

  return (
    <main>
      <Calender today={today} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" name="name" required ref={todoNameRef} />
            <button type="submit">タスクを追加</button>
          </label>
        </form>

        <p>タスクリスト</p>
        <TodoList todos = {todos} toggleTodo={toggleTodo} />
      </div>
    </main>
  );
}

export default App;