import Header from "@/components/Layout/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Feature from "./components/Feature";
// import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Feature />
      </main>

     {/* <Footer /> */}
    </>
  );
}
