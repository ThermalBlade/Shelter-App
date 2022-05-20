import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const AddAnimal = () => {
	const [formValue, setFormValue] = useState({
		animalName: '',
		animalType: '',
		shelterName: '',
		adoptionStatus: '',
		previousOwners: '',
		monthsInShelter: 0,
	});
	const [shelters, setShelters] = useState([]);
	const [dbConversion, setDbConversion] = useState({});
	const [animalTypes, setAnimalTypes] = useState([]);

	// Get the different kinds of animals from the database
	useEffect(async () => {
		await axios.get('http://localhost:3000/animalTypes')
			.then(response => {
				setDbConversion(response.data);
				for (const key in response.data) setAnimalTypes((oldArray) => [...oldArray, key])
			}).catch(function (error) { console.log(error); });
	}, []);

	// Get the different shelters from the database
	useEffect(async () => {
		await axios.get('http://localhost:3000/shelters')
			.then(response => {
				response.data.map(shelter => {
					setShelters((oldArray) => [...oldArray, shelter.name])
				})
			}).catch(function (error) { console.log(error); });
	}, []);

	// Update state values on form change
	const formChange = (e) => {
		e.preventDefault();
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value
		});
	}

	// Add new animal to database based on form values
	const formSubmit = async (e) => {
		e.preventDefault();
		if (formValue.animalType && formValue.shelterName && formValue.animalName && formValue.adoptionStatus) {
			const uuid = uuidv4();
			await axios.post('http://localhost:3000/' + dbConversion[formValue.animalType], {
				type: formValue.animalType,
				shelter: formValue.shelterName,
				name: formValue.animalName,
				status: formValue.adoptionStatus,
				previousOwners: formValue.previousOwners ? formValue.previousOwners.split(', ') : [],
				monthsInShelter: Number(formValue.monthsInShelter),
				id : uuid,
			})
		}
	}

	// Render the form
	return (
		<div className='body-text'>
			<div className='form-wrapper'>
				<form id='animal-search'>
					<label> Add Animal </label>
					<input
						type='text'
						name='animalName'
						placeholder='Animal name'
						value={formValue.animalName}
						onChange={formChange}
						required='required'
					/> <br />

					<select name='shelterName' value={formValue.shelterName} onChange={formChange} required>
						<option key='default'>Select a shelter</option>
						{shelters.map(item => <option key={item} value={item}>{item}</option>)}
					</select> <br />

					<select name='animalType' value={formValue.animalType} onChange={formChange}>
						<option key='default'>Select an animal type</option>
						{animalTypes.map(type => <option key={type}>{type}</option>)}
					</select> <br />

					<select name='adoptionStatus' value={formValue.adoptionStatus} onChange={formChange}>
						<option key='default'>Select an adoption status</option>
						<option key='forAdoption'>For Adoption</option>
						<option key='adopted'>Adopted</option>
					</select> <br />

					<input
						type='text'
						name='previousOwners'
						placeholder='Previous Owners (separate by comma)'
						value={formValue.previousOwners}
						onChange={formChange}
					/> <br />

					<p>Months in shelter</p>
					<input
						type='number'
						name='monthsInShelter'
						placeholder='Months In Shelter'
						value={formValue.monthsInShelter}
						onChange={formChange}
					/> <br />

					<button onClick={formSubmit}>Add Animal</button>
				</form>
			</div> <br />
		</div>
	);
};

export default AddAnimal;