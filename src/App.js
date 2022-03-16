import logo from "./logo.svg";
import "./App.css";
import LaunchData from "./component/LaunchData";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <LaunchData />
      </QueryClientProvider>
    </div>
  );
}

export default App;
