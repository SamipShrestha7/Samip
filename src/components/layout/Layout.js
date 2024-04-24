import { useSelector } from "react-redux";
import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function Layout({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  return (
    <>
      {userInfo?.role && <Header />}
      {children}
      {userInfo?.role && <Footer />}
    </>
  );
}
