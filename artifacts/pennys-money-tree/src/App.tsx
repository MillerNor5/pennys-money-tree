import { Router as WouterRouter, Route, Switch } from "wouter";
import { GameProvider } from "./context/GameContext";
import Game from "./pages/Game";

function App() {
  return (
    <GameProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/" component={Game} />
          <Route path="/end" component={Game} />
        </Switch>
      </WouterRouter>
    </GameProvider>
  );
}

export default App;
