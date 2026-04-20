import { BrowserRouter, Route, Routes } from "react-router"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
