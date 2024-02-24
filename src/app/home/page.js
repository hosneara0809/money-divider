// import Login from "./app/login";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import HowItWork from "./components/HowItWork";
import Blog from "./components/Blog";
import About from "../about/page";
import FAQ from "./components/FAQ"
import Contact from "../contact/contact";
import Layout from "@/components/Layout/Layout";
export default function Home() {
  return (
    <>
        <Layout>
        <Hero />
        <About />
        <Feature />
        <HowItWork />
        <Blog />
        <FAQ />
        <Contact />
        </Layout>

    </>
  );
}
