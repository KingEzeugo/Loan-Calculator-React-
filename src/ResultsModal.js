import React from "react";
import { Modal, Button } from "react-bootstrap"; // Import React Bootstrap components

function ResultsModal({ show, hide, results }) {
   return (
      <Modal show={show} onHide={hide}>
         <Modal.Header closeButton>
            <Modal.Title>Loan Details</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>
               Monthly payment:{" "}
               <span className="fw-bold fs-4">
                  {results.monthlyPayment}
               </span>
            </p>
            <p>
               Total interest:{" "}
               <span className="fw-bold fs-4">
                  {results.totalInterest}
               </span>
            </p>
            <p>
               Total payment:{" "}
               <span className="fw-bold fs-4">
                  {results.totalPayment}
               </span>
            </p>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={hide}>
               OK
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ResultsModal;
