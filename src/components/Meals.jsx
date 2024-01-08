import { useContext } from "react";
import { AppContext } from "../context";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import youtubeIcon from './youtube.png';

const Meals = () => {
    const { meals, isLoading } = useContext(AppContext);
    const [favorites, setFavorites] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [showModal, setShowModal] = useState(false);


    const addFavorite = (idMeal) => {
        // Check if the meal with idMeal is already in favorites
        const isAlreadyInFavorites = favorites.some(favorite => favorite.idMeal === idMeal);

        // If the meal is not in favorites, add it
        if (!isAlreadyInFavorites) {
            // Find the meal with the desiredId
            const matchingMeal = meals.find(meal => meal.idMeal === idMeal);

            // If a matching meal is found, add it to the favorites list
            if (matchingMeal) {
                setFavorites(prevFavorites => [...prevFavorites, matchingMeal]);
            }
        }
    };

    const handleDelete = (idMeal) => {
        // Filter out the item with the matching idMeal
        const updatedFavorites = favorites.filter(
            (favorite) => favorite.idMeal !== idMeal
        );

        // Set the updated array of favorites
        setFavorites(updatedFavorites);
    };

    /*  const openModal = (strCategory) => {
         return alert(strCategory)
     } */




    const openModal = (meal) => {
        setSelectedMeal(meal);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <section className="container">


            {isLoading ? (
                <p>Loading...</p>
            ) : meals.length < 1 ? (
                <h1>No data</h1>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {/* --------FAVORITEMEALS------- */}
                        <div className="col-md-12" style={{ backgroundColor: "black" }}>
                            <h5></h5>
                            <ul
                                className="list-unstyled d-flex flex-wrap position-relative"
                                style={{
                                    backgroundColor: "black",
                                    padding: 0,
                                    maxWidth: "720px", // Adjust the width as needed
                                }}
                            >
                                {favorites.map((favorite) => (
                                    <li
                                        key={favorite.idMeal}
                                        className="m-2 position-relative"
                                        style={{
                                            width: "60px",
                                            height: "80px", // Increased height to accommodate the button
                                            overflow: "hidden",
                                            position: "relative",
                                        }}
                                    >
                                        <img
                                            src={favorite.strMealThumb}
                                            alt={favorite.idMeal}
                                            style={{ width: "100%" }}
                                        />
                                        <button
                                            className="btn btn-danger btn-sm position-absolute bottom-0 start-50 translate-middle-x"
                                            style={{ zIndex: 1, fontSize: "0.7rem" }}
                                            onClick={() => handleDelete(favorite.idMeal)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>





                        <div className="row">
                            {/* --------PEALIST------- */}
                            {meals.map((singleMeal) => {
                                const { idMeal, strMeal: title, strMealThumb: image, strCategory } = singleMeal;

                                return (
                                    <div key={idMeal} className="col-md-4 mb-4">
                                        <article className="card">
                                            <img
                                                src={image}
                                                alt={title}
                                                className="card-img-top"
                                                style={{ width: "100%" }}
                                                onClick={() => openModal(singleMeal)}
                                            />
                                            <div className="card-body d-flex flex-column align-items-center">
                                                <h6 className="card-title mb-0">{title}</h6>
                                                <button
                                                    className="btn btn-primary mt-2"
                                                    style={{ backgroundColor: "#6B83BA", color: "#eee", borderColor: "transparent" }}
                                                    onClick={() => addFavorite(selectedMeal.idMeal)}
                                                >
                                                    Like
                                                </button>
                                            </div>
                                        </article>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        {selectedMeal && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>{selectedMeal.strMeal}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* Add content based on the details of the clicked meal */}
                                    <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} style={{ width: "100%" }} />
                                    <h6 className="mt-3" style={{ color: '#555' }}>{selectedMeal.strInstructions}</h6>

                                </Modal.Body>
                                <Modal.Footer style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="d-flex align-items-center">
                                        <img src={youtubeIcon} alt="YouTube Icon" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                        <h6 style={{ color: '#eee', margin: 0 }}>You can check it in youtube</h6>
                                    </div>
                                    <button
                                        className="btn btn-primary mt-2"
                                        style={{ backgroundColor: "#6B83BA", color: "#eee", borderColor: "transparent" }}
                                        onClick={() => addFavorite(selectedMeal.idMeal)}
                                    >
                                        Like
                                    </button>

                                    {/* Other footer content here */}
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>

                </div>

            )
            }
        </section >
    );
};

export default Meals;

