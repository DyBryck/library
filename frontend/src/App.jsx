import { TableDemo } from "./components/Table";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <TableDemo />
    </ThemeProvider>
  );
}

export default App;
