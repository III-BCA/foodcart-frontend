
import { useEffect, useState } from "react";
import {
  getMenus,
  addMenu,
  updateMenu,
  deleteMenu
} from "../services/MenuService";
import "./Menu.css";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = () => {
    getMenus().then(res => setMenus(res.data));
  };

  const handleSubmit = () => {
    const menuData = { itemName, price, category };

    if (editId === null) {
      // ADD
      addMenu(menuData).then(loadMenus);
    } else {
      // UPDATE
      updateMenu(editId, menuData).then(() => {
        setEditId(null);
        loadMenus();
      });
    }

    clearForm();
  };

  const handleEdit = (menu) => {
    setEditId(menu.id);
    setItemName(menu.itemName);
    setPrice(menu.price);
    setCategory(menu.category);
  };

  const clearForm = () => {
    setItemName("");
    setPrice("");
    setCategory("");
  };

  return (
    <div className="menu-container">
      <h2>Food Cart Menu</h2>

      <div style={{ marginBottom: "12px" }}>
        <input
          className="form-input"
          placeholder="Item Name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? "Update Item" : "Add Item"}
        </button>
      </div>

      <hr />

      <table className="menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.itemName}</td>
              <td>{menu.price}</td>
              <td>{menu.category}</td>
              <td className="actions">
                <button className="btn" onClick={() => handleEdit(menu)}>Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteMenu(menu.id).then(loadMenus)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
