import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {


    const { setSearchTerm, searchTerm, randomMeal, text, setText } = useGlobalContext()


    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text) {
            setSearchTerm(text)
        }
    }
    return (

        <header className="bg-light p-3">
            <form className="d-flex ms-4" onSubmit={handleSubmit}>
                <input type="text"
                    className="form-control me-2"
                    style={{ width: '200px' }}
                    placeholder="Search meal"
                    onChange={handleChange}
                    value={text}
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#6B83BA", color: "#eee", borderColor: "transparent", marginRight: "3px" }}>
                    Submit
                </button>

                <button type="button" className="btn btn-secondary" onClick={randomMeal}>Surprise</button>
            </form>
        </header>
    )
}

export default Search