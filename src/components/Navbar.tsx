/** @jsx jsx */

import * as React from 'react';

import { NavLink as Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: space-around;
`;

const NavListItem = styled.li``;

const NavLink = styled(Link)`
  text-decoration: none;
  &.active {
    color: white;
  }
`;

const Navbar = () => {
  return (
    <nav>
      <NavList>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            Focus
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            Feedback
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            Stats
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            Settings
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            English
          </NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/" activeClassName="active">
            mark@markwetzel.com
          </NavLink>
        </NavListItem>
      </NavList>
    </nav>
  );
};

export default Navbar;
