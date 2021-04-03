import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useWindowSize from "hooks/useWindowSize";
import PrivateSection from "routes/PrivateSection";
import PublicRoutes from "routes/PublicRoutes";
import { ContextProvider } from "context/Context";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function Routes() {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [width, height] = useWindowSize();

  const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isUserLoggedIn =
    localStorage.getItem("TOKEN") !== undefined &&
    localStorage.getItem("TOKEN") !== null
      ? true
      : false;
  return isUserLoggedIn ? (
    <ContextProvider>
      <Provider template={AlertTemplate} {...options}>
        <PrivateSection />
      </Provider>
    </ContextProvider>
  ) : (
    <Provider template={AlertTemplate} {...options}>
      <PublicRoutes />
    </Provider>
  );
}

export default Routes;
