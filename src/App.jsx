import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReq, getReq, postReq, editReq } from "./redux/todo/TodoSlice";
import './App.css';

const App = () => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editId, setEditId] = useState(null);

  const { data, isLoading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  console.log(data);

  useEffect(() => {
    dispatch(getReq());
  }, [dispatch]);

  function handleAddProduct() {
    let newObj = {
      img,
      name,
      lastName,
      phoneNumber,
    };

    if (editId) {
      newObj._id = editId;
      dispatch(editReq(newObj)).then(() => {
        setEditId(null);
        clearInputs();
      }).catch((error) => {
        console.error("Error edit:", error);
      });
    } else {
      dispatch(postReq(newObj)).then(() => clearInputs());
    }
  }

  function handleEditProduct(product) {
    setImg(product.img);
    setName(product.name);
    setLastName(product.lastName);
    setPhoneNumber(product.phoneNumber);
    setEditId(product._id);
  }


  function clearInputs() {
    setImg("");
    setName("");
    setLastName("");
    setPhoneNumber("");
  }

  return (
    <div className="app-container">
      <h1 className="title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input"
        />
        <button onClick={handleAddProduct} className="btn">{editId ? "Update" : "Save"}</button>
      </div>
      {isLoading && <div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div>
}
      {error && <p className="status error">Error: {error}</p>}
      <div className="todo-list">
        {data.length === 0 ? (
          <p className="status">. . .</p>
        ) : (
          data.map((el) => (
            <div key={el._id} className="todo-item">
              <img src={el.img} alt="User" className="todo-img"/>
              <div className="todo-details">
                <p className="todo-text"><strong>Name:</strong> {el.name}</p>
                <p className="todo-text"><strong>Last Name:</strong> {el.lastName}</p>
                <p className="todo-text"><strong>Phone:</strong> {el.phoneNumber}</p>
              </div>
              <div className="todo-actions">
                <button onClick={() => handleEditProduct(el)} className="btn edit">Edit</button>
                <button onClick={() => dispatch(deleteReq(el._id))} className="btn delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
