import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  // NavBtnLink,
} from './NavbarElements';
import { WalletData } from '../wallet-data';

const Navbar: React.FC = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>

        <NavLink to='/all-campaigns' >
            All Campaigns
          </NavLink>

          <NavLink to='/create-campaigns' >
            Create Campaigns
          </NavLink>

          <NavLink to='/balance' >
            Balance
          </NavLink>


          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <WalletData />
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
