/* Dependencies */
import React, { useState } from "react";

/* Components */
import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarToggler,
} from "./SidebarStyles";

/* Styles */
import "../../styles/home.css"

/* Others */
import { SidebarItems } from "..";
import { AiOutlineMenu } from "react-icons/ai";

const MOBILE_VIEW = window.innerWidth < 468;

/**
 * @name Sidebar
 * @description sidebar to navigate into the page
 * @param {children} data information for sidebar
 * @returns
 */
export default function Sidebar({ children }) {
  const [displaySidebar, setDisplaySidebar] = useState(!MOBILE_VIEW);

  /**
   * handleSidebarDisplay to listen window size
   */
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
