import React from 'react';
import AnimalSearch from './Components/AnimalSearch';
import AddAnimal from './Components/AddAnimal';
import Navigation from './Components/Navigation';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path = '/' element = {<Navigation />}>
					<Route index element = {<AnimalSearch />} />
					<Route path = 'add-animal' element = {<AddAnimal />} />
				</Route >
			</Routes>
	  	</Router>
	)
}

export default App;
