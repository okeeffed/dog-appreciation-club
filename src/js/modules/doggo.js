import axios from 'axios';
import config from '../config';

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
				const grid = document.querySelector('.grid');
				const dog = document.querySelector('.dog');

				dog.innerText = res.data.dog.name;

				res.data.photos.map((photo, index) => {
					if (index > 11) return;
					const el = this.append(photo);
					let parent = document.createElement('div');
					parent.innerHTML = el;

					/**
					 * Continue to append to mobile grid
					 */
					grid.appendChild(parent.firstChild);
				});
			})
			.catch(err => {
				if (!config.debug) {
					console.log('Axios fail');
				} else {
					console.log(err.message);
				}
			});

		return this;
	}



	/**
	 * Append photo to the photo grid.
	 * @param  {[Object object]} photo Photo of doggo.
	 */
	append(photo) {
		console.log(photo);
		return `<div class="item -six e-raised e-hover-floating a-animate">
			<img src="${photo.url}" href="${photo.title}" />
		</div>`;
	}

	/**
	 * Render the req data as a grid item.
	 * @param  {[Object object]} doggo Render doggo info
	 */
	render(doggo) {
		console.log(doggo);
		return `<div class="item -four e-raised e-hover-floating a-animate">
			<img src="${doggo.dog.link}"
		</div>`;
	}
}
