import Home from "pages/home";
import { BrowserRouter,Switch, Route } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact>
                    <Home/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
  }
  export default Routes;