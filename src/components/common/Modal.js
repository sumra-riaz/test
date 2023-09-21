import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  contactsList,
  fetchContacts,
  reset,
} from "../../redux/modal/modalSlice";
import DetailModal from "../feature/DetailModal";

export default function MyModal({ show, onHide }) {
  const [even, setEven] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const contacts = useSelector(contactsList);
  const { type } = useParams();
  const dispatch = useDispatch();

  const handleItemSelect = (id) => {
    if (contacts?.contacts?.[id]) {
      setDetail(contacts?.contacts?.[id]);
      setDetailModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(
      fetchContacts({ page: currentPage, search: e.target.value, type })
    ); // Fetch contacts for the current page
  };

  useEffect(() => {
    if (type) {
      setCurrentPage(1);
      dispatch(reset());
      dispatch(fetchContacts({ page: 1, search: searchTerm, type })); // Fetch contacts for the current page
    }
  }, [type]);

  const handleScroll = () => {
    const ulElement = document.getElementById("contactList");
    if (
      ulElement.scrollTop + ulElement.clientHeight + 2 >=
        ulElement.scrollHeight &&
      !isLoading &&
      contacts?.total > contacts?.contacts_ids?.length
    ) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [show]);

  useEffect(() => {
    (async () => {
      if (currentPage > 1) {
        await dispatch(
          fetchContacts({ page: currentPage, search: searchTerm, type })
        );
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal {type ?? ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to={`/A`}>
            <Button className="btn-A">All Contacts</Button>
          </Link>
          {"  "}
          <Link to={`/B`}>
            <Button className="btn-B">US Contacts</Button>
          </Link>
          <br />
          <div className="search-wrapper">
            <h3>Contacts:</h3>
            <Form.Control
              placeholder="Search"
              className="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <ul
            id="contactList"
            className="list-group mt-3"
            onScroll={handleScroll}
          >
            {contacts?.contacts_ids?.map((contactId) => {
              if (even && contactId % 2 !== 0) return null;
              return (
                <>
                  <li
                    key={contactId}
                    className="list-group-item"
                    onClick={() => handleItemSelect(contactId)}
                  >
                    {contactId}
                  </li>
                </>
              );
            })}
            {isLoading && <p>Loading...</p>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={even}
            onChange={() => setEven(!even)}
          />
          <Link to={"/"}>
            <Button className="btn-C" onClick={onHide}>
              Close
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      {detailModal && (
        <DetailModal
          open={detailModal}
          onClose={() => setDetailModal(false)}
          detail={detail}
        />
      )}
    </>
  );
}
