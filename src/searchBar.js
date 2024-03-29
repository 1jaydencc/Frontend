import React, { useState } from 'react';
import './searchBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchBar({ renderResults, renderTerm }) {
    const [searchCategory, setSearchCategory] = useState('Name');
    const [searchTerm, setSearchTerm] = useState('');
    const [DropdownText, setDropdownText] = useState('Search by');

    const handleSearchCategoryChange = (event) => {
        setSearchCategory(event.target.text);
        setDropdownText(event.target.text);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        renderTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        renderResults();

        const resultsComponent = document.getElementById('results');
        if (resultsComponent) {
          resultsComponent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="searchBar">
            <div id='bar'>
                <InputGroup>
                    <Form.Control onChange={handleSearchTermChange}/>
                    <DropdownButton align="end" title={DropdownText}>
                        <Dropdown.Item onClick={handleSearchCategoryChange}>Name</Dropdown.Item>
                        <Dropdown.Item onClick={handleSearchCategoryChange}>BP Number</Dropdown.Item>
                        <Dropdown.Item onClick={handleSearchCategoryChange}>Species</Dropdown.Item>
                        <Dropdown.Item onClick={handleSearchCategoryChange}>Matrix</Dropdown.Item>
                        <Dropdown.Item onClick={handleSearchCategoryChange}>Chromatography</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </div>
            &nbsp;
            <div id='submit'>
                <input type="submit" value="Search" onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default SearchBar;