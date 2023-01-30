import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// This code will fetch the list of occupations and states from the specified endpoint upon component mount, and populate the respective dropdown fields with options. When the form is submitted, it will check that all fields are filled and if so, send a POST request request to the same endpoint, passing the form data as JSON body in the format specified in the prompt.If the post requests were succesful, the server will return a 201 status code with the created user object in the response andit will be displayed.  

function FormFetchRewards() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [occupations, setOccupations] = useState([]);
    const [selectedOccupation, setSelectedOccupation] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [response, setResponse] = useState(null);

    // The useEffect hook fetches data from the endpoint "https://frontend-take-home.fetchrewards.com/form" and sets the occupations and states state variables with the data obtained from the endpoint.
    useEffect(() => {
        // fetch data from endpoint
        axios
            .get("https://frontend-take-home.fetchrewards.com/form")
            .then((res) => {
                setOccupations(res.data.occupations);
                setStates(res.data.states);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // The handleSubmit function is called when the form is submitted. It prevents the default form submission and checks that all fields are filled. If all fields are filled, it sends a POST request to the same endpoint, passing the form data as the request body. If the POST request is successful, the server returns a 201 status code with the created user object in the response and the function sets the response state variable with this response.
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !password || !selectedOccupation || !selectedState) {
            alert("Please fill out all fields.");
            return;
        }
        axios
            .post("https://frontend-take-home.fetchrewards.com/form", {
                name,
                email,
                password,
                occupation: selectedOccupation,
                state: selectedState,
            })
            .then((res) => {
                setResponse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3 response">
                <Form.Group as={Col} controlId="formGridFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>
            </Row>


            <Form.Group className="mb-3 response size" as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>


            <Row className="mb-3 response">
                <Form.Group className="mb-3" as={Col} controlId="formGridOccupation">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Select
                        defaultValue=""
                        value={selectedOccupation}
                        onChange={(event) => setSelectedOccupation(event.target.value)}
                    >
                        <option value="" disabled>Select an occupation</option>
                        {occupations.map((occupation) => (
                            <option key={occupation} value={occupation}>
                                {occupation}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                        defaultValue=""
                        value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}
                    >
                        <option value="" disabled>Select a state</option>
                        {states.map((state) => (
                            <option key={state.name} value={state.abbreviation}>
                                {state.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>


            <Button variant="primary" className = "" type="submit">
                Submit
            </Button>

            <div className="properResponse">
                {response && <p className="response">Response: {JSON.stringify(response.data)}</p>}
            </div>



        </Form>
    );
}

export default FormFetchRewards;
