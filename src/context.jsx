import React, { useContext } from "react";
import { useState, useEffect } from "react"
import { ClockLoader } from "react-spinners";



const AppContext = React.createContext()

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
const randomlUrl = "http://www.themealdb.com/api/json/v1/1/random.php"



const AppProvider = ({ children }) => {
    const [text, setText] = useState("")
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsloading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")


    /* useEffect(() => {
        const fetchMeals = async (url) => {
            setIsloading(true)
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch meals');
                }
                const data = await response.json();
                if (data.meals) {
                    setMeals(data.meals)
                } else {
                    setMeals([]);
                }
                /*  setMeals(data.meals ? data.meals : []); 


            } catch (error) {
                console.error('Error fetching meals:', error);
            }
            setIsloading(false)
        };

        fetchMeals(`${allMealsUrl.slice(0, -1)}${searchTerm}`);
    }, [searchTerm]); */

    const fetchMeals = async (url) => {
        <ClockLoader
            loading={isLoading}
        />
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch meals");
            }
            const data = await response.json();
            setMeals(data.meals ? data.meals : []);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
        setIsloading(false);
    };

    const randomMeal = () => {
        setSearchTerm("")
        setText("")
        fetchMeals(randomlUrl)
    }

    useEffect(() => {
        // Function for initial default request
        const fetchInitialMeals = async () => {
            fetchMeals(allMealsUrl);
        };

        // Call the function when the component mounts
        fetchInitialMeals();
    }, []);

    useEffect(() => {
        // Fetch meals when searchTerm changes
        fetchMeals(`${allMealsUrl.slice(0, -1)}${searchTerm}`);
    }, [searchTerm]);



    return (
        <AppContext.Provider value={{ meals, isLoading, setSearchTerm, randomMeal, text, setText }}>
            {children}
        </AppContext.Provider>
    );
};





export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }