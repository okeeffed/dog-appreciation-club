import axios from 'axios';

export default class Doggo {
	init() {
		Doggo.fetchDoggo();

	}
	fetchDoggo() {
		axios.get(process.env.API_URL)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log('Axios fail'));

		return this;
	}
}
