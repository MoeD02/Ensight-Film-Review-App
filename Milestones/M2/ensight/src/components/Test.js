import React, { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        const testFetchButton = document.getElementById('test-fetch-button');

        testFetchButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/test_fetch/');
                if (response.ok) {
                    const data = await response.json();
                    // Handle the data received from the fetch call
                    console.log(data);
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    }, []); // An empty dependency array ensures the effect runs once on component mount

    return (
        <button id="test-fetch-button">Test Fetch</button>
    );
}

export default Test;