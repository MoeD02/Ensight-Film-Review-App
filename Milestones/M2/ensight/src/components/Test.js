import React, { useState, useEffect } from 'react';

const Test = () => {
    const [movieTitle, setMovieTitle] = useState('');
    
    let searchQuery='';

    
    const [searchResults, setSearchResults] = useState([]); // State to store search results
    
    useEffect(() => {
        //const testFetchButton = document.getElementById('test-fetch-button');
        const search_movies = document.getElementById('search_movies');
        // testFetchButton.addEventListener('click', async () => {
        //     try {
        //         // Create a new movie object
        //         let newMovie1;
        //         let newMovieData;
        //         const newMovie = await fetch('http://127.0.0.1:8000/test_fetch_first_movie/');
        //         if (newMovie.ok) {
        //             newMovieData = await newMovie.json(); // Extract data from the response
        //             console.log(newMovieData.id);
        //             // Create a new movie object using the extracted data
        //             newMovie1 = {
        //                 title: newMovieData.title, // Replace with the actual key in your newMovieData
        //                 description: newMovieData.description, // Replace with the actual key in your newMovieData
        //                 // Include other relevant properties from newMovieData
        //             };
        //         }
        //         const data = {
        //             author: 1,
        //             //movies: [newMovieData.id], // Use an array to include the new movie
        //             title: 'New Test List',
        //             description: 'This is testing to create a list from the frontend and then send it to the backend',
        //             movie_ids: [1,2,3],
        //         };

        //         // Make a POST request to create a new movie list
        //         const response = await fetch('http://127.0.0.1:8000/create_movie_list/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(data),
        //         });

        //         if (response.ok) {
        //             const responseData = await response.json();
        //             console.log('Movie List created:', responseData);
        //         } else {
        //             console.error('Request failed with status:', response.status);
        //         }
        //     } catch (error) {
        //         console.error('An error occurred:', error);
        //     }
        // });
        
        search_movies.addEventListener('click', async () => {
            const inputElement = document.getElementById('searchQueryInput');
            const searchQuery = inputElement.value.trim();

            console.log('Search button clicked');
            console.log('This is the search query getting passed: ' + searchQuery);
            try {
                const data = {
                    content: searchQuery,
                };
                
                const response = await fetch('http://127.0.0.1:8000/header_search/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    console.log(response);
                    const responseData = await response.json();
                    setSearchResults(responseData); // Set the search results state
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        });
    }, []);
    
       
//application\ensight\application\ensight\static\app\images\posters\posters\SpiderMan_Poster.png
    return (
        <div>
            
            <button id="test-fetch-button">Test Fetch</button>
            <p>Movie Title: {movieTitle}</p>
            <input
                type="text"
                placeholder="Enter a movie title"
                id="searchQueryInput" // Give the input an ID
            />
            <button id="search_movies">Search Movie</button>
            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results:</h2> 
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                <h3>{}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Test;
