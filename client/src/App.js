import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./scenes/login/Login";
import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import HomePage from "./scenes/homepage/HomePage";
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={HomePage}></Route>
          </Switch>
        </Router>
      </div>

    </ApolloProvider>
  );
}

export default App;
