import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Admin from './pages/Admin'
import Terms from './pages/Terms'
import TikTokCallback from './pages/TikTokCallback'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Terms />} />
        <Route path="/auth/tiktok/callback" element={<TikTokCallback />} />
      </Routes>
    </BrowserRouter>
  )
}
