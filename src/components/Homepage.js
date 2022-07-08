import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./homepage.css";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

export default function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();
  const [date, setDate] = useState(Date(new Date));
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // read
          onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((todo) => {
                setTodos((oldArray) => [...oldArray, todo]);
              });
            }
          });
        } else if (!user) {
          navigate("/");
        }
      });
    }, []);
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    // add
    const writeToDatabase = () => {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd,
        date: date
      });
      setTodo("");
    };
    // update
    const handleUpdate = (todo) => {
      setIsEdit(true);
      setTodo(todo.todo);
      setTempUidd(todo.uidd);
      setDate(todo.date);
    };
    const handleEditConfirm = () => {
      update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
        todo: todo,
        tempUidd: tempUidd,
        date: date
      });
      setTodo("");
      setIsEdit(false);
      setDate(todo.date);
    };
    //complete todo
    const handleComplete = (todo) => {
            update(ref(db, `/${auth.currentUser.uid}/${todo.uidd}`), {
            completed: true,
            date: date
            });
    };  
    // delete
    const handleDelete = (uid) => {
      remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };
  return (
    <div className="homepage">
        <div className="homepage-header">
            <h1>Todo List</h1>
        </div>
      <input
        className="todo-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}<br></br>{todo.date}</h1>
          <button onClick={() => handleComplete(todo.uid)} className="done-button">Complete</button>
          <button onClick={() => handleUpdate(todo)} className="edit-button">Edit</button>
          <button onClick={() => handleDelete(todo.uidd)} className="delete-button">Remove</button>
        </div>
      ))}
      {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <button onClick={writeToDatabase} className="add-button">Add</button>
        </div>
      )}
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
    </div>
  );
}

