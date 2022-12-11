import "./App.css";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import categories from "./api";

function App() {
  return (
    <div className="App">
      {/*Navbar*/}
      <Navbar />
      {/*Destaque*/}
      <Banner />
      {/*Filme por categoria*/}
      {categories.map((category) => {
        return (
          <Row
            key={category.name}
            title={category.title}
            path={category.path}
            isLarge={category.isLarge}
          />
        );
      })}
    </div>
  );
}

export default App;
