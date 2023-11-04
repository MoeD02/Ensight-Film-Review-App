import React, { useState, useEffect } from 'react';

const Test = () => {
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        const testFetchButton = document.getElementById('test-fetch-button');

        testFetchButton.addEventListener('click', async () => {
            try {
                // Create a new movie object
                let newMovie1;
                let newMovieData;
                const newMovie = await fetch('http://127.0.0.1:8000/test_fetch/');
                if (newMovie.ok) {
                    newMovieData = await newMovie.json(); // Extract data from the response
                    console.log(newMovieData.id);
                    // Create a new movie object using the extracted data
                    newMovie1 = {
                        title: newMovieData.title, // Replace with the actual key in your newMovieData
                        description: newMovieData.description, // Replace with the actual key in your newMovieData
                        // Include other relevant properties from newMovieData
                    };
                }
                const data = {
                    author: 1,
                    movies: [newMovieData.id], // Use an array to include the new movie
                    title: 'New Test List',
                    description: 'This is testing to create a list from the frontend and then send it to the backend',
                    movie_id: newMovieData.id,
                };

                // Make a POST request to create a new movie list
                const response = await fetch('http://127.0.0.1:8000/create_movie_list/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Movie List created:', responseData);
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    }, []);

    return (
        <div>
            <button id="test-fetch-button">Test Fetch</button>
            <p>Movie Title: {movieTitle}</p>
        </div>
    );
};

export default Test;
