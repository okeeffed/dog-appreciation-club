import axios from 'axios';

export default class Doggo {
	/**
	 * Initialise the page
	 * @return {Doggo} Return Doggo instance
	 */
	init() {
		this.fetchDoggo();
		return this;
	}

	/**
	 * Fetch the dog info from the API and display it
	 * on the page
	 * @return {Doggo} Return Doggo instance
	 */
	fetchDoggo() {
		axios.get('http://localhost:4090/api/v1/dog')
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log('Axios fail'));

		return this;
	}
}
