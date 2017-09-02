import axios from 'axios';

export default class Doggo {
	init() {
		this.fetchDoggo();

	}

	fetchDoggo() {
		axios.get('http://localhost:4090/api/v1/dog')
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log('Axios fail'));

		return this;
	}
}
