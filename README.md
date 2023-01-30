# fetchRewards

FormFetchRewards is a React component that implements a form for collecting user information. The form has fields for name, email, password, occupation and state. The component fetches the list of occupations and states from the endpoint "https://frontend-take-home.fetchrewards.com/form" when the component mounts and populates the respective dropdown fields with options. When the form is submitted, it checks that all fields are filled and if so, sends a POST request to the same endpoint, passing the form data as JSON body in the format specified in the prompt. If the post request is successful, the server returns a 201 status code with the created user object in the response and it is displayed.

#Usage
To use the FormFetchRewards component in your project, import it like this:

```import FormFetchRewards from "./FormFetchRewards";```

And then include it in your JSX code:

```<FormFetchRewards />```

Dependencies

The component depends on the following packages:

1. React
2. Axios
3. React-Bootstrap
4. You'll need to install these packages in your project in order to use the FormFetchRewards component. You can install them by running the following command in your project directory:

```npm install react axios react-bootstrap```
