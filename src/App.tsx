import { Route } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home'
import Header from './components/Header'
import Character from './pages/Character'
import HeroForm from './components/HeroForm'

import './App.css'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false
        }
    }
});

function App() {    

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header />
                
                <Route path="/" component={Home} />
                <Route path="/char/:id" component={Character} />
                <Route path="/add-one" component={HeroForm} />
            </QueryClientProvider>
        </>
    )
}

export default App
