import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

const CharacterListing = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('alive');

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character/?status=" + category)
            .then((response) => setCharacters(response.data.results))
            .catch((error) => console.error(error));
    }, [category]);
    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(filter.toLowerCase()));

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="text-3xl font-bold text-gray-800">Character Listing</h1>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search characters"
                className="w-full p-2 mb-4 border border-gray-400 rounded-md"
            />
            <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full p-2 mb-4 border border-gray-400 rounded-md"
            >
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <ul>
                {filteredCharacters.map(character => (
                    <li key={character.id} className="mb-4">
                        <h2 className="text-lg font-bold text-gray-800">{character.name}</h2>
                        <p className="text-lg text-gray-600">{character.status}</p>
                        <p className="text-lg text-gray-600">{character.species}</p>
                        <p className="text-lg text-gray-600">{character.type}</p>
                        <p className="text-lg text-gray-600">{character.gender}</p>
                        <p className="text-lg text-gray-600">
                            Origin: {character.origin.name}
                        </p>
                        <p className="text-lg text-gray-600">
                            Location: {character.location.name}
                        </p>
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-auto rounded-md"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterListing;