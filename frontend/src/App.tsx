import { Toaster } from "react-hot-toast"
import Container from "./components/Container"
import Header from "./components/Header"
import Home from "./pages/Home/page"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <Toaster/>
      <Container className="bg-[#FFF]"><Header></Header></Container>
      <Home></Home>
      <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]"><Footer></Footer></Container>
    </>
  )
}

export default App
