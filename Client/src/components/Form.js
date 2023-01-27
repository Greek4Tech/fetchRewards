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
            <label>
                Full Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <label>
                Occupation:
                <select
                    value={selectedOccupation}
                    onChange={(event) => setSelectedOccupation(event.target.value)}
                >
                    <option value="" disabled>
                        Select an occupation
                    </option>
                    {occupations.map((occupation) => (
                        <option key={occupation} value={occupation}>
                            {occupation}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                State:
                <select
                    value={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                >
                    <option value="" disabled>
                        Select a state
                    </option>
                    {states.map((state) => (
                        <option key={state.name} value={state.abbreviation}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Submit</button>
            {response && <p>Response: {JSON.stringify(response.data)}</p>}
        </form>
    );
}

export default Form;
