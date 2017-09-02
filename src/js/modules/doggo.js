import axios from 'axios';
import config from '../config';
import SmoothScroll from 'smooth-scroll';
import Loading from './loading';

export default class Doggo {
	/**
	 * Initialise the page
	 * @return {Doggo} Return Doggo instance
	 */
	init() {
		this.fetchDoggo();

		const button = document.querySelector('.replace');
		button.addEventListener('click', (e) => {
			e.preventDefault();
			this.fetchDoggo();
		}, false);

		return this;
	}

	/**
	 * Fetch the dog info from the API and display it
	 * on the page
	 * @return {Doggo} Return Doggo instance
	 */
	fetchDoggo() {
		Loading.append();

		const section = document.querySelector('.doggo');
		const hero = document.querySelector('.hero');
		section.classList.remove('-visible');
		window.setTimeout(() => section.classList.add('-hidden'), 300);

		const scroll = new SmoothScroll();
		let options = { offset: 0 };

		scroll.animateScroll(hero, null, options);

		axios.get('https://dogappreciationclub.now.sh/api/v1/dog')
			.then(res => {
				const image = document.querySelector('.main-photo');
				const grid = document.querySelector('.grid');
				this.render(res.data.dog);

				while (image.firstChild) {
					image.removeChild(image.firstChild);
				}

				while (grid.firstChild) {
					grid.removeChild(grid.firstChild);
				}

				res.data.photos.map((photo, index) => {
					if (index > 12) return;

					if (index === 0) {
						const el = this.updateMain(photo);
						let parent = document.createElement('div');
						parent.innerHTML = el;
						image.appendChild(parent.firstChild);
					} else {
						const el = this.append(photo);
						let parent = document.createElement('div');
						parent.innerHTML = el;
						grid.appendChild(parent.firstChild);
					}
				});

				section.classList.remove('-hidden');
				section.classList.add('-visible');

				options = { offset: -60 };
				scroll.animateScroll(section, null, options);

				Loading.removeFrom();
			})
			.catch(err => {
				Loading.removeFrom();
				if (!config.debug) {
					console.log('Axios fail');
				} else {
					console.log(err.message);
				}
			});

		return this;
	}

	/**
	 * Update main doge photo
	 * @param  {[Object object]} photo Photo of doggo.
	 */
	updateMain(photo) {
		console.log(photo);
		return `<img src="${photo.url}" href="${photo.title}" />`;
	}

	/**
	 * Append photo to the photo grid.
	 * @param  {[Object object]} photo Photo of doggo.
	 */
	append(photo) {
		console.log(photo);
		return `<div class="item -six e-hover-floating a-animate">
			<img src="${photo.url}" href="${photo.title}" />
		</div>`;
	}

	/**
	 * Render the req data as a grid item.
	 * @param  {[Object object]} doggo Render doggo info
	 */
	render(doggo) {
		const dog = document.querySelector('.dog');
		const info = document.querySelector('.info');
		dog.innerText = doggo.name;

		while (info.firstChild) {
			info.removeChild(info.firstChild);
		}

		doggo.info.map(copy => {
			const el = `<p>${copy}</p>`;
			let parent = document.createElement('div');
			parent.innerHTML = el;
			info.appendChild(parent.firstChild);
		});

		return this;
	}
}
