import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST_ALL } from '../entities/media/actions/mediaActions';
import apolloClient from '../app/graphql/apollo-client';

const TestGraphQL = () => {
    const [testData, setTestData] = useState(null);

    useEffect(() => {
        const testQuery = async () => {
            try {
                const { data } = await apolloClient.query({
                    query: GET_POST_ALL
                });
                console.log("Test GraphQL data:", data);
                setTestData(data);
            } catch (error) {
                console.error("Test GraphQL error:", error);
            }
        };
        
        testQuery();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>GraphQL Test</h1>
            <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                {JSON.stringify(testData, null, 2)}
            </pre>
        </div>
    );
};

export default TestGraphQL;
