import React, { useState, useEffect } from "react";
import axios from "axios";

// This code will fetch the list of occupations and states from the specified endpoint upon component mount, and populate the respective dropdown fields with options. When the form is submitted, it will check that all fields are filled and if so, send a POST request request to the same endpoint, passing the form data as JSON body in the format specified in the prompt.If the post requests were succesful, the server will return a 201 status code with the created user object in the response andit will be displayed.  

function Form() {
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

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="exampleInputFullName">Full Name:</label>
                <input
                    type="text"
                    className="form-control input-field"
                    id="exampleInputFullName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <br />
            <div className="form-group">
                <label for="exampleInputEmail">Email</label>
                <input
                    type="email"
                    className="form-control input-field"
                    id="exampleInputEmail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <br />
            <div className="form-group">
                <label for="exampleInputPassword">Password</label>
                <input
                    type="password"
                    className="form-control input-field"
                    id="exampleInputPassword"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <br />
            <div className="form-row align-items-center">
                <div className="col-auto my-1">
                    <label className="mr-sm-2" for="inlineFormCustomSelect">Occupation</label>
                    <select
                        className="form-control input-field"
                        id="inlineFormCustomSelect"
                        value={selectedOccupation}
                        onChange={(event) => setSelectedOccupation(event.target.value)}
                    >
                        <option value="" disabled>Select an occupation</option>
                        {occupations.map((occupation) => (
                            <option key={occupation} value={occupation}>
                                {occupation}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <br />
            <div className="form-row align-items-center">
                <div className="col-auto my-1">
                    <label className="mr-sm-2" for="inlineFormCustomSelect">State</label>
                    <select
                        className="form-control input-field"
                        id="inlineFormCustomSelect"
                        value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}
                    >
                        <option value="" disabled>Select a state</option>
                        {states.map((state) => (
                            <option key={state.name} value={state.abbreviation}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <br />
            <div className="response">
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
            <div className="input-field">                
            {response && <p className="">Response: {JSON.stringify(response.data)}</p>}
            </div>


        </form>

    );
}

export default Form;
