import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState(""); /* This Todo is the input text */
  const [todos, setTodos] = useState([]); /* This Todos is an array which will hold all our todos */
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])
  
  const saveTolocalSt = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
   
  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }
  
  //Input Handler
  const handleChange = (e) => {
    setTodo(e.target.value);

  };
   
  //Edits the task
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTolocalSt()

  };
 
  // Deletes the Task
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTolocalSt()

  };

  // Adds the Task
  const handleAdd = () => {
    setTodos([...todos, { id : uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTolocalSt()

  };
  
  // Add Complete Task and apply line through
  const handleClick = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTolocalSt()

  }
  

  return (
    <>
      <div className="maincont h-[100vh] flex justify-center items-center">
        <div className="bg-opacity-25 backdrop-filter backdrop-blur-lg h-[80vh] flex justify-center p-6 text-white font-sans flex-col m-2 rounded-xl ">
          <h1 className="text-4xl text-center my-5">YOUR TASKS LIST</h1>
          <div className="flex justify-center gap-4 my-3">
            {/* Input Area */}

            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Add your tasks here..."
              className="rounded-lg w-full p-2 bg-[#36313082]  focus:outline-none"
            />

            {/* Add Button */}

            <button
              onClick={handleAdd}
              className="bg-[#51a6f1be] px-4 py-[15px] rounded-full hover:bg-[#51a6f1] disabled:bg-[#c4e3ff]"
              disabled=  {todo.length <= 3}
            >
              <IoAdd />
            </button>
            {/* <button className="px-4 py-[15px] rounded-full bg-yellow-400 text-black">
              <CiLight />
            </button> */}
          </div>
            
          {/* Task Completed Button which shows all the completed tasks*/}

          <div className="items-center flex gap-2 justify-center">
            <input
              type="checkbox"
               onChange={toggleFinished}
              checked={showfinished}
              className="appearance-none w-[19px] h-[19px] bg-[#fff] rounded-full my-3 checked:bg-green-500  checked:border-0 "
            />
            <label htmlFor="checkbox">Show Finished Tasks</label>
          </div>
          <div className="border border-[#ffffff94] mb-4"></div>

          {/* Task bar where tasks are shown started */}

          <div className="taskscont flex flex-col gap-3 overflow-auto ">
            {todos.length === 0 && <div className="text-center">Come on! Do something! Don't sit idle!</div>}
            {todos.map((item) => { 
              return (showfinished || !item.isCompleted) && 
                <div key={item.id}  className="task bg-[#ffffff79] py-2 px-3 rounded-[15px] text-[#1a1a1a] flex items-center justify-between gap-5 mr-2" >
                  {/* Task Completed Button */}

                  <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleClick} className="appearance-none w-[19px] h-[19px] bg-[#ff2a00b5] rounded-full my-3 checked:bg-green-500 checked:border-0 "/>

                  {/* Todo text to be displayed  */}

                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>

                  <div className="morebtns flex items-center">
                    <IoMdMore className="text-2xl cursor-pointer" />

                    {/* Edit Button */}

                    <button
                      onClick={(e) => {handleEdit(e, item.id)}}
                      className="bg-[#51a6f1be] hover:bg-[#51a6f1] p-2 rounded-full m-1"
                    >
                      <FiEdit2 className="text-white" />
                    </button>

                    {/* Delete Button */}

                    <button
                      onClick={(e)=>{handleDelete(e, item.id)}}
                      className="bg-[#51a6f1be] hover:bg-[#51a6f1] p-2 rounded-full m-1"
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </div>
              
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
