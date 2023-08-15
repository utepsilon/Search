import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchForm = styled.div`
  border: 1px solid;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const Results = styled.div`
  position: relative;
  left: 15%;
  height: auto;
  width: 70%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  .item {
    border: 1px dotted;
    padding: 0.5rem;
    background: crimson;
    border-radius: 5px;
    box-shadow: 5px 5px #d3d3d3;
    color: snow;
    &:hover {
      background: black;
      transition: all 0.4s ease;
      color: white;
    }
  }
`;

const Heading = styled.h1`
  font-family: Arial;
`;
const Form = styled.form`
  font-family: Fantasy;
  margin: 1rem;
  align-content: center;

  .label {
    margin: 1rem;
  }
  .submit {
    margin-left: 1rem;
    background: crimson;
    border: none;
    height: 2rem;
    width: 5rem;
    border-radius: 5px;

    &:hover {
      color: white;
      background: black;
      transition: all 0.4s ease;
    }
  }
`;
function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const url = "https://api.datamuse.com/words?rel_syn=";
  const handleChange = (event) => {
    setQuery(event.currentTarget.value);
  };

  const searchSynonyms = async () => {
    let data = await axios.get(url + query);
    setResults(data.data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchSynonyms();
    setQuery("");
  };

  return (
    <div>
      {" "}
      <Heading>Search</Heading>
      <SearchForm className="search-form">
        <Form onSubmit={handleSubmit}>
          <label className="label"> Search a Synonym:</label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={query}
          ></input>
          <input className="submit" type="submit" value="Search"></input>
        </Form>
      </SearchForm>
      <Results className="results">
        {results.map((data, index) => {
          return (
            <div className="item" key={index}>
              {" "}
              {data.word}
            </div>
          );
        })}
      </Results>
    </div>
  );
}

export default Search;
