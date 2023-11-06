<<<<<<< HEAD
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
=======
function App() {
    return (
        <main className="bg-dark-main relative h-screen">
            {/* </ nav> */}
            <section className="padding">
                {/* < someComponent /> */}
            </section>
            <section className=""></section>
        </main>
>>>>>>> 9ce20b68ad6f1e26490aa5344ee57a33eb3cbc82
    );
}

export default App;
