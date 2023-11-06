import { Routes, Route } from 'react-router-dom';
import { SignUp } from './pages';

import HomePage from './pages/HomePage';

import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <main className="bg-dark-main relative h-screen text-slate-gray">
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
        </main>
    );
}

export default App;
