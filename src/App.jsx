import Hero from "./components/Hero";
import Layout from "./components/Layout";
import CoffeeForm from "./components/CoffeeForm";
import Stats from "./components/Stats";
import History from "./components/History";

function App() {
  const isAuthenticated = true;

  const authenticateContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && authenticateContent}
    </Layout>
  );
}

export default App;
