import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import FirstSearch from './components/FirstSearch/FirstSearch';
import SecondSearch from './components/SecondSearch/SecondSearch';

const router = createBrowserRouter([
    {path: '/', element: <FirstSearch/>},
    {path: '/search', element: <SecondSearch/>}
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
