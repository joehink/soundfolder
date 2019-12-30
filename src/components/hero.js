import React, { Component } from "react"
import { FaChevronDown } from "react-icons/fa";

import bomb from "../images/bomb_1.svg";

import Container from "../components/container";
import Nav from "../components/nav";
import SearchBar from "../components/searchBar";

export default class Hero extends Component {
    render() {
        return (
            <header className="hero">
                <Container>
                    <Nav white />
                    <img src={bomb} alt="placeholder" className="heroImg" />
                    <SearchBar />
                    <h2>Totally free sound effects. No attribution required.</h2>
                    <button className="recent"><i><FaChevronDown /></i>Recently added</button>
                </Container>
            </header>
        )
    }
}
