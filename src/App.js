import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from "./components/Login";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Editor from './components/Editor/Editor';

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      {
        !user ? <Login /> :
         
            <Router>
              <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/editor" exact component={Editor} />
              </Switch>
            </Router>
      }
    </div>
  )
}

export default App