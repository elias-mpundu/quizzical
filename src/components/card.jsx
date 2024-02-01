import { useState, useEffect } from "react";
import queryString from 'query-string';

import Questions from "./questions.jsx"

// const DEBOUNCE_DELAY = 3000;

export default function Card() {

    //State Initialization
    const [triviaQuest, setTriviaQuest] = useState(null)
    const [tracker, setTracker] = useState(false)
    const [params, setParams] = useState({
        category: "",
        difficulty: "",
        type: "",
    })

    console.log(params)
    // const [debouncedParams, setDebouncedParams] = useState(params)

    //Use Effects

    useEffect(() => {
        
        if (params.category && params.difficulty && params.type) {
            let queryParams = queryString.stringify({ ...params });
            console.log(queryParams)
            fetch(`https://opentdb.com/api.php?amount=6&${queryParams}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTriviaQuest(data);
            });
        }

    }, [params])

    // useEffect(() => {
    //         const timer = setTimeout(() => {
    //             setDebouncedParams(params)
    //         }, DEBOUNCE_DELAY);

    //         return (() => clearTimeout(timer));
    //     }, [params]
    // )

    //handle functions
    function handleParams(event) {
        const { name, value } = event.target
        setParams(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    function handleSubmit (event) {
        event.preventDefault();
        setTracker(!tracker)
    };

    return (
        <>
            {/* Note: Conditional statement that renders form or questions depending to the boolean state of tracker*/}
            {tracker ? 
            <Questions triviaQuest={triviaQuest} tracker={tracker} trackFunc={setTracker}/> : 
            <form className="card" onSubmit={handleSubmit}>
                <h2>Quizzical</h2>
                <p>Answer the questions and test your knowledge!</p>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    className="form-control"
                    name="category"
                    value={params.category}
                    onChange={handleParams}
                    >
                        <option value="">Choose</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>

                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                    id="difficulty"
                    className="form-control"
                    name="difficulty"
                    value={params.difficulty}
                    onChange={handleParams}
                    >
                        <option value="">Choose</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <label htmlFor="question-type">Type</label>
                    <select
                    id="question-type"
                    className="form-control"
                    name="type"
                    value={params.type}
                    onChange={handleParams}
                    >
                        <option value="">Choose</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <button className="submit" type="submit">Play</button>
            </form>
            }
        </>
    );
}
