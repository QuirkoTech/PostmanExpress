import HomePage from './pages/HomePage';
import { Route, Router, Routes } from 'react-router-dom';
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
            </Routes>
        </div>
    );
}

export default App;
