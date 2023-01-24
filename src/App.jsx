import { Route, Routes } from 'react-router';
import Home from './/pages/Home/Home';
import MatchDetails from './pages/MatchDetails/MatchDetails';


function App() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/match/:id' element={<MatchDetails />} />
        </Routes>
    );
}
export default App;
