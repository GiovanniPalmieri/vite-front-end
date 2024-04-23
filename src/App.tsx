import { Route, Routes } from 'react-router';
import Auth from './pages/AuthPage';
import EmployView from './pages/EmployPage';
import ManagerPage from './pages/ManagerPage';

export default function App(){

    return (
        <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/employView" element={<EmployView />} />
            <Route path="/managerView" element={<ManagerPage />} />
        </Routes>
    );
}