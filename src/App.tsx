import { Route } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/Home'
import Character from './pages/Character'
import AddHero from './pages/AddHero'
import Header from './components/Header'
import Footer from './components/Footer'

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
                <Route path="/add-one" component={AddHero} />

                <Footer />
            </QueryClientProvider>
        </>
    )
}

export default App
