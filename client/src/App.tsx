import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AuthCallback from "./pages/AuthCallback"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback  signUpForceRedirectUrl="/auth-callback" />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App