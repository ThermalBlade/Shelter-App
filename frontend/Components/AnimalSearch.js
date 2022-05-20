import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const AnimalSearch = () => {
	const [formValue, setFormValue] = useState({
		animalName: '',
		animalType: '',
		shelterName: ''
	});
	const [animals, setAnimals] = useState([]);
	const [shelters, setShelters] = useState([' - All Shelters - ']);
	const [dbConversion, setDbConversion] = useState({});
	const [animalTypes, setAnimalTypes] = useState([]);

	// Get the animal types from the database
	useEffect(async () => {
		await axios.get('http://localhost:3000/animalTypes')
			.then(response => {
				setDbConversion(response.data);
				for (const key in response.data) setAnimalTypes((oldArray) => [...oldArray, key]);
			}).catch(function (error) { console.log(error); });
	}, []);

	// Get the shelters from the database
	useEffect(async () => {
		await axios.get('http://localhost:3000/shelters')
			.then(response =>
				response.data.map(shelter => {
					setShelters((oldArray) => [...oldArray, shelter.name])
				})
			).catch(function (error) { console.log(error); });
	}, []);

	// Update state values on form update
	const formChange = (e) => {
		e.preventDefault();
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value
		});
	}

	// Get animals from database based on form values
	const formSubmit = async (e) => {
		e.preventDefault();
		if (dbConversion[formValue.animalType]) {
			await axios.get('http://localhost:3000/' + dbConversion[formValue.animalType])
			.then(response => {
				const fromData = response.data.filter(animal =>
					animal.name.toLowerCase().includes(formValue.animalName.toLowerCase())
				)
				fromData.filter(animal => animal.shelter == formValue.shelterName);
				setAnimals(fromData)
			});
		}
		else {
			setAnimals([]);
			for (const i in animalTypes) {
				await axios.get('http://localhost:3000/' + dbConversion[animalTypes[i]])
				.then(response => {
					const fromData = response.data.filter(animal =>
						animal.name.toLowerCase().includes(formValue.animalName.toLowerCase())
					);
					fromData.filter(animal => animal.shelter == formValue.shelterName);
					for (const i in fromData) setAnimals((oldArray) => [...oldArray, fromData[i]]);
				});
			}
		}
	}

	// Change animal adoption status
	const changeStatus = async (animal, e) => {
		e.preventDefault();
		let status;
		if (animal.status == 'For Adoption') {
			status = 'Adopted';
		} else {
			status = 'For Adoption'
		}
		const updateObject = {
			'type': animal.type,
			'shelter': animal.shelter,
			'name': animal.name,
			'status': status,
			'previousOwners': animal.previousOwners,
			'monthsInShelter': animal.monthsInShelter,
			'id': animal.id
		}
		await axios.put('http://localhost:3000/' + dbConversion[animal.type] + '/' + animal.id, updateObject);
		formSubmit(e);
	}

	// Render all found animals from database
	const renderAnimals = () => animals.map(animal =>
		<ul className='main-list' key={animal.id}>
			<li key='type'>{animal.type}</li>
			<li key='name-type'>Name: {animal.name}</li>
			<li key='status'>Status: {animal.status}</li>
			<li key='prevOwners'>Previous Owners: {
				!animal.previousOwners.length ? 'None' : animal.previousOwners.map((owner, i) => {
					if (i < animal.previousOwners.length - 1) {
						return owner + ', '
					} else return owner
				})
			}</li>
			<li key='monthsInShelter'>Months In Shelter: {String(animal.monthsInShelter)}</li>
			<button onClick={(e) => changeStatus(animal, e)}>{animal.status}</button>
		</ul>
	);

	// Render search form
	return (
		<div className='body-text'>
			<div className='form-wrapper'>
				<form id='animal-search'>
					<label> Animal Search </label>
					<input
						type='text'
						name='animalName'
						placeholder='Animal name (optional)'
						value={formValue.animalName}
						onChange={formChange}
					/> <br />

					<select name='shelterName' value={formValue.shelterName} onChange={formChange}>
						{shelters.map(item => <option key={item} value={item}>{item}</option>)}
					</select> <br />

					<select name='animalType' value={formValue.animalType} onChange={formChange}>
						<option key='-'> - All Animals - </option>
						{animalTypes.map(type => <option key={type}>{type}</option>)}
					</select> <br />

					<button onClick={formSubmit}>Search</button>
				</form>
			</div> <br />
			<div> {renderAnimals()} </div>
		</div>
	);
};

export default AnimalSearch;