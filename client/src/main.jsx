import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <ToastContainer
            // position="top-center"
            theme="colored"
            style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: '20px' }}
        />
    </>,
);
