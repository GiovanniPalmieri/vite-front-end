import { Route, Routes } from 'react-router';
import Auth from './pages/Auth';
import EmployView from './pages/EmployView';
import ManagerView from './pages/ManagerView';

export default function App(){

    return (
        <Routes>
            <Route path="/" element={<Auth/>} />
            <Route path="/employView" element={<EmployView />} />
            <Route path="/managerView" element={<ManagerView />} />
        </Routes>
    );
}