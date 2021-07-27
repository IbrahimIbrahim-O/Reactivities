import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import {  } from "../Models/activity";

export default function NavBar() {
    return(
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item as={NavLink} to="/" exact header> 
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}  />
                    Reactivites
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activites"/>
                <Menu.Item  >
                    <Button positive content="Create Activity" as={NavLink} to="/createActivity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

}