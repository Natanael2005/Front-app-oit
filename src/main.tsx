
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/App.css';  // <-- Importa el archivo global


createRoot(document.getElementById('root')!).render(
    <App />
  
)
