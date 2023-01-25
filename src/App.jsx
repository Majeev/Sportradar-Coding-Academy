import { Route, Routes } from 'react-router';
import Home from './/pages/Home/Home';
import MatchDetails from './pages/MatchDetails/MatchDetails';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/match/:id' element={<MatchDetails />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
export default App;
