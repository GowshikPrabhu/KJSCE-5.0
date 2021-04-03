import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router-dom";
import SLUGS from "resources/slugs";
import {
  IconAgents,
  IconArticles,
  IconContacts,
  IconIdeas,
  IconLogout,
  IconOverview,
  IconSearch,
  IconSettings,
  IconSubscription,
  IconTickets,
} from "assets/icons";
import { convertSlugToUrl } from "resources/utilities";
import LogoComponent from "./LogoComponent";
import Menu from "./MenuComponent";
import MenuItem from "./MenuItemComponent";
import { useContext } from "react/cjs/react.development";
import { Context } from "context/Context";

const useStyles = createUseStyles({
  separator: {
    borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06,
  },
});

function SidebarComponent() {
  const { push } = useHistory();
  const theme = useTheme();
  const classes = useStyles({ theme });
  const isMobile = window.innerWidth <= 1080;

  async function logout() {
    localStorage.removeItem("TOKEN");
    push(SLUGS.login);
  }

  function onClick(slug, parameters = {}) {
    push(convertSlugToUrl(slug, parameters));
  }

  return (
    <Menu isMobile={isMobile}>
      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        <LogoComponent />
      </div>
      <MenuItem
        id={SLUGS.dashboard}
        title="Dashboard"
        icon={IconSubscription}
        onClick={() => onClick(SLUGS.dashboard)}
      />
      <MenuItem
        id={SLUGS.search}
        title="Search Vessels"
        icon={IconSearch}
        onClick={() => onClick(SLUGS.search)}
      />
      <MenuItem
        id={SLUGS.getStarted}
        title="Track By MMSI"
        icon={IconIdeas}
        onClick={() => onClick(SLUGS.getStarted)}
      />
      <MenuItem
        id={SLUGS.mylist}
        title="My Vessels"
        icon={IconIdeas}
        onClick={() => onClick(SLUGS.mylist)}
      />

      <div className={classes.separator}></div>
      <MenuItem
        id={SLUGS.settings}
        title="Settings"
        icon={IconSettings}
        onClick={() => onClick(SLUGS.settings)}
      />

      <MenuItem id="logout" title="Logout" icon={IconLogout} onClick={logout} />
    </Menu>
  );
}

export default SidebarComponent;
