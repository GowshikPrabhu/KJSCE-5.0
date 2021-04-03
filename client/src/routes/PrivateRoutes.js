import React, { Suspense, lazy, useEffect, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SLUGS from "resources/slugs";
import LoadingComponent from "components/loading";
import { Context } from "context/Context";
import { getUserData } from "actions/userActions";

const DashboardComponent = lazy(() => import("./dashboard"));
const SearchComponent = lazy(() => import("../screens/Search/Search"));
const MyList = lazy(() => import("../screens/MyList/MyList"));
const GetStartedComponent = lazy(() =>
  import("../screens/GetStarted/GetStarted")
);
const DemoComponent = lazy(() => import("../screens/Demo/Demo"));

function PrivateRoutes() {
  const [state, dispatch] = useContext(Context);
  const { isLoaderVisible } = state;

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserData();
      dispatch({ type: "SET_USER", payload: userData.payload.user[0] });
    };

    getUser();
  }, []);
  return (
    <Suspense fallback={<LoadingComponent loading />}>
      <LoadingComponent loading={isLoaderVisible} />
      <Switch>
        <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
        <Route exact path={SLUGS.search} component={SearchComponent} />
        <Route exact path={SLUGS.getStarted} component={GetStartedComponent} />
        <Route exact path={SLUGS.mylist} component={MyList} />

        <Route exact path={SLUGS.ideasTwo} render={() => <div>ideasTwo</div>} />
        <Route
          exact
          path={SLUGS.ideasThree}
          render={() => <div>ideasThree</div>}
        />
        <Route exact path={SLUGS.ideas} render={() => <div>ideas</div>} />
        <Route exact path={SLUGS.articles} render={() => <div>articles</div>} />
        <Route exact path={SLUGS.track} component={DemoComponent} />

        <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
        <Route
          exact
          path={SLUGS.subscription}
          render={() => <div>subscription</div>}
        />
        <Redirect to={SLUGS.dashboard} />
      </Switch>
    </Suspense>
  );
}

export default PrivateRoutes;
