import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddPost from "../AddContact";
import EditContact from "../EditContact";

const Home = ({ contacts, deleteContact }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState();
  const handleAdd = (type) => {
    type === "add" ? setOpen(true) : setOpenEdit(true);
  }
  const closeModal = (type) => {

    type === "add" ? setOpen(false) : setOpenEdit(false);
  }

  const handleEdit = (ID) => {
    setId(ID)
    handleAdd("edit")
  }

  return (
    <div className="container">
      {open && <AddPost closeModal={(e) => closeModal(e)} />}
      {openEdit && <EditContact closeModal={(e) => closeModal(e)} id={id} />}
      <div className="row d-flex flex-column">
        <button className="btn btn-outline-dark my-5 ml-auto " onClick={() => handleAdd("add")}>
          Add Data
        </button>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr className="table-nav" key={id}>
                    <td >{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <button
                       
                        className="btn btn-sm btn-primary mr-1"
                        onClick={()=>handleEdit(contact.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
