import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import TV from './Pages/TV';
import Search from './Pages/Search';
import Error from './Pages/ErrorPage';
import Navbar from './components/Navbar';
import Others from './Pages/Others'
import TopRatedM from './Pages/TopRatedM';
import TopRatedtvs from './Pages/TopRatedtvs';
import Upcomingmt from './Pages/Upcomingmt';

const App = () => {
    const routes = [
        {
            path: '/',
            element: <Trending />,
        },
        {
            path: '/movies',
            element: <Movies />,
        },
        {
            path: '/tv',
            element: <TV />,
        },
        {
            path: '/search',
            element: <Search />,
        },
        {
            path: '/others',
            element: <Others />//,
            // children: [
            //   {path: 'top-rated/tv-series', element: <Movies />},
            //   {path: 'top-rated/movies', element: <Error />},
            //   {path: 'top-upcoming/movies', element: <Movies />}
            // ]
        },
        {
            path: '/topratedtv', element: <TopRatedtvs />
        },
        {
            path: '/topratedmovies', element: <TopRatedM />
        },
        {
            path: '/Upcomingmt', element: <Upcomingmt />
        },
        {
            path: '*',
            element: <Error />,
        },
    ];

    return (
        <div>
                <BrowserRouter>
                    <Header />
                    <Navbar />
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Routes>
                    <Footer />
                </BrowserRouter>
        </div>
    );
};

export default App;