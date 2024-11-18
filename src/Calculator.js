import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; // Import React Bootstrap components
import ResultsModal from "./ResultsModal";

function Calculator() {
   const [results, setResults] = useState({
      monthlyPayment: "",
      totalPayment: "",
      totalInterest: ""
   });

   const [inputs, setInputs] = useState({
      amount: 2000,
      apr: 5,
      years: 10
   });

   const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

   function handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
   }

   function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
   }

   function handleSubmit(event) {
      event.preventDefault();

      if (isNumeric(inputs.amount) && isNumeric(inputs.apr) && isNumeric(inputs.years)) {
         const amount = parseFloat(inputs.amount);
         const interest = parseFloat(inputs.apr) / 1200;
         const numPayments = parseFloat(inputs.years) * 12;
         const x = Math.pow(1 + interest, numPayments);
         const monthly = (amount * x * interest) / (x - 1);

         const formatter = new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD"
         });

         setResults({
            monthlyPayment: formatter.format(monthly),
            totalPayment: formatter.format(monthly * numPayments),
            totalInterest: formatter.format(monthly * numPayments - amount)
         });

         showModal(); // Show ResultsModal after calculation
      }
   }

   const showModal = () => setIsModalVisible(true);
   const hideModal = () => setIsModalVisible(false);

   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
               <Form.Label>Amount $:</Form.Label>
               <Form.Control
                  type="text"
                  name="amount"
                  value={inputs.amount}
                  onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>APR %:</Form.Label>
               <Form.Control
                  type="text"
                  name="apr"
                  value={inputs.apr}
                  onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Years:</Form.Label>
               <Form.Control
                  type="text"
                  name="years"
                  value={inputs.years}
                  onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
               Calculate
            </Button>
         </Form>

         <ResultsModal
            show={isModalVisible}
            hide={hideModal}
            results={results}
         />
      </>
   );
}

export default Calculator;
