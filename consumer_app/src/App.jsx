import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
function App() {
    return (
        <div >
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
                 <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
        </div>
    );
}

export default App;
