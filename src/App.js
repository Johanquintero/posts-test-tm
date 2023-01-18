import './App.css';
import './Buttons.css';
import Middleware from './api/Middleware';
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';

function App() {

  return (
    <Middleware routes={<Home />} loginComponent={<SignIn />} />
  );
}

export default App;
