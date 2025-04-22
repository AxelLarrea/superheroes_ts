import { Route } from 'wouter'

import Home from './pages/Home'
import Header from './components/Header'

import './App.css'

function App() {
    
    return (
        <>
            <Header />
            
            <Route path="/" component={Home} />
            <Route path="/add-one" component={() => <div>Agregar personaje</div>} />
        </>
    )
}

export default App
