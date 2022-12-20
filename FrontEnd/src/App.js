
import './App.css';
import './css/base.css';
import './css/common.css';
import './css/xzoom.css';
import { Provider } from 'react-redux';
import store from "./redux/store"
import MyRouter from './components/routerComponent/Route'
function App() {
  return (
    <Provider store={store}>
      <MyRouter/>
    </Provider>
  );
}

export default App;
