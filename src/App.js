import { useState } from "react";
import Layout from "./layout/Layout";
import Grid from "./components/Grid";

function App() {
  const [algorithm, setAlgorithm] = useState("Rat In Maze");
  const gridDimentions = { rows: 13, columns: 20 };

  return (
    <Layout algorithm={algorithm}>
      <Grid gridDimentions={gridDimentions} setAlgorithm={setAlgorithm} algorithm={algorithm}/>
    </Layout>
  );
}

export default App;
