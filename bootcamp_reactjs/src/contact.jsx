import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ContactPage = ({ contacts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchContacts = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>CONTACT PAGE</h1>

        {/* Tombol untuk membuka modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addContactModal"
        >
          Tambah Kontak
        </button>
      </div>

      {/* Input Pencarian */}
      <div className="mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          id="searchInput"
          placeholder="Cari kontak..."
          value={searchTerm}
          onChange={searchContacts}
        />
      </div>

      {contacts.length < 1 ? (
        <p>Contact data is empty</p>
      ) : (
        <table className="table" id="contactsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => {
              const safeName = contact.name.replace(/\s+/g, '_');
              return (
                <tr key={safeName}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>
                    {/* Tombol Detail */}
                    <button
                      className="btn btn-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#detailModal${safeName}`}
                    >
                      Detail
                    </button>

                    {/* Tombol Update */}
                    <button
                      className="btn btn-warning btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target={`#updateModal${safeName}`}
                    >
                      Update
                    </button>

                    {/* Tombol Delete */}
                    <form
                      action={`/contact/delete/${encodeURIComponent(contact.name)}`}
                      method="POST"
                      style={{ display: 'inline' }}
                    >
                      <button
                        type="submit"
                        className="btn btn-danger btn-sm"
                        onClick={() => window.confirm('Are you sure you want to delete this contact?')}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal untuk tambah data */}
      <div
        className="modal fade"
        id="addContactModal"
        tabIndex="-1"
        aria-labelledby="addContactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addContactModalLabel">Tambah Kontak Baru</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form untuk input data kontak */}
              <form id="contactForm" action="/contact/add" method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nama</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Nomor HP</label>
                  <input type="tel" className="form-control" id="mobile" name="mobile" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email (Opsional)</label>
                  <input type="email" className="form-control" id="email" name="email" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                  <button type="submit" className="btn btn-primary">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div
          id="successToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">Data berhasil ditambahkan!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
