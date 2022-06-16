import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact, id, closeModal }) => {
  // const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
  }, [currentContact]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      name,
      phone,
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
    // history.push("/");
    closeModal("edit")
  };

  return (
    <div class="modal" style={{ display: "block", backgroundColor: "#8080807d" }}>
      <div class="modal-dialog">
        <div class="modal-content shadow">
          <div class="modal-header">
            <button
              className="btn btn-dark"
              onClick={() => closeModal("edit")}
            >
              Go back
            </button>
          </div>
          <div class="modal-body">
            <div className="container">
              <div className="row d-flex flex-column">

                <div className="col-sm-12 mx-auto p-5">
                  {currentContact ? (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          value={name}
                          placeholder={"Name"}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          value={email}
                          placeholder={"Email"}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          value={phone}
                          placeholder={"Phone"}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="form-group d-flex align-items-center justify-content-between my-2">
                        <button type="submit" className="btn btn-primary">
                          Update Data
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => closeModal("edit")}
                        >
                          cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <h1 className="text-center">No Contact Found</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
