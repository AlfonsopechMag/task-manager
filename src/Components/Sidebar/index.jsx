import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarToggler,
} from "./SidebarStyles";

import "../../styles/home.css"
import { SidebarItems } from "..";

const MOBILE_VIEW = window.innerWidth < 468;

export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  const handleSidebarDisplay = (e) => {
    e.preventDefault();
    if (window.innerWidth > 468) {
      setDisplaySidebar(!displaySidebar);
    } else {
      setDisplaySidebar(false);
    }
  };

  return (
    <React.Fragment>
    
        <SidebarContainer displaySidebar={displaySidebar}>
            <SidebarWrapper>
              <SidebarLogoWrapper displaySidebar={displaySidebar}>
                <div className="container_toggler">
                  <SidebarToggler
                    displaySidebar={displaySidebar}
                    onClick={handleSidebarDisplay}
                  >                
                    <AiOutlineMenu className="icon_toggle"/>             
                  </SidebarToggler>
                </div>
              </SidebarLogoWrapper >
              <SidebarItems displaySidebar={displaySidebar} />
            </SidebarWrapper>          
        </SidebarContainer>
      <Children displaySidebar={displaySidebar}>{children}</Children>
    </React.Fragment>
  );
}
