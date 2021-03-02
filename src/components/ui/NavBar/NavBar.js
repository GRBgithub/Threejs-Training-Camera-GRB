import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { helpers } from "../../../utils";
const NavBar = ({ routes,location }) => {
  return (
    <NavContainer>
      <ul>
        {routes.map((route, index) => (
          <NavLink route={route} index={index} location={location} key={helpers.generateKey("NavLink"+index)}></NavLink>
        ))}
      </ul>
    </NavContainer>
  );
};

const NavLink = ({ route, index,location }) => {
  if (route.protectedRoute && !localStorage.getItem("token")) return <></>;

  if (!route.nav.show) return <></>;

  return (
    <motion.li
      initial={{ y: 0 }}
      animate={{
        y: location.pathname === route.path ? -5 : 0,
        transition: { ...transition, delay: 0.2 * (index+1) },
      }}
    >
      <Link to={route.path}>
        {route.nav.icon}
        <span>{route.nav.name}</span>
      </Link>
    </motion.li>
  );
};
const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
const variant = {
  Logoinitial: { opacity: 0 },
  Logoshow: { opacity: 1, transition: { ...transition, delay: 0 } },
};
const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  z-index: 5;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    top: unset;
    bottom: 0;
    height: 7%;
  }
 
  & ul {
    margin-right: 10%;
    display: flex;
    & li {
      margin-left: 5%;
      & a {
        display: flex;
        color: ${(props) => props.theme.colors.secondary};
        @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        & span {
          margin-left: 5px;
          @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
            margin-top: 5px;
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;

export default NavBar;
