import React, { useState, useEffect, useRef } from 'react';
import ScrollToTopButton from './ScrollToTopButton';
import neo4j from 'neo4j-driver';

export default function Results(props) {
  const { showResults, queryTerm } = props;

  const [searchResults, setSearchResults] = useState([]);

  const resultsRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      console.log(queryTerm);
      const driver = neo4j.driver(
        'neo4j+s://39f470cd.databases.neo4j.io',
        neo4j.auth.basic('neo4j', 'GRQHnkLdqja2PXzjYUg4wwoCxCI3uAGPOjbe6N_K6KM')
      );
      const session = driver.session();
      try {
        const result = await session.writeTransaction(tx => 
            tx.run(`
              CALL {
                CALL db.index.fulltext.queryNodes("BP_search", "${queryTerm}~")
                YIELD node, score
                RETURN node, score
                UNION ALL
                CALL db.index.fulltext.queryNodes("Manufacturer_search", "${queryTerm}~")
                YIELD node, score
                RETURN node, score
                UNION ALL
                CALL db.index.fulltext.queryNodes("Matrix_QC_search", "${queryTerm}~")
                YIELD node, score
                RETURN node, score
                UNION ALL
                CALL db.index.fulltext.queryNodes("Special_requirement_search", "lighs~")
                YIELD node, score
                RETURN node, score
              }
              WITH node, count(*) AS matches, sum(score) AS totalScore
              WHERE matches >= 1
              MATCH (n:BP)-[*]->(node)
              RETURN n, totalScore
              ORDER BY totalScore DESC
            `)
        );

        const records = result.records.map(record => record.toObject());
        setSearchResults(records);
      } finally {
        await session.close();
      }

      await driver.close();

      if (showResults && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }

    fetchData();
  }, [showResults, queryTerm]);

  return (
    <div>
      <div id='scrollup'>
        <ScrollToTopButton />
      </div>
      <div>Query Term: {queryTerm}</div>
      <div id='search-results' ref={resultsRef}>
        {searchResults.length > 0 ? (
          <div>
            <h2>Search Results:</h2>
            {searchResults.map((result, index) => (
                <div key={index}>
                    <p>{result.n.labels} {result.n.properties.BP_number}</p>
                    <p>{JSON.stringify(result)}</p>
                </div>
            ))} 
          </div>
        ) : (
          <div>
            <p>No search results.</p>
          </div>
        )}
      </div>
    </div>
  );
}

