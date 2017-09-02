/**
 * Loading appends and removes loading overlay.
 * @class Loading
 */
export default class Loading {
	/**
	 * Append the overlay to the target.
	 * @param  {Element} target HTML element to append the loader to.
	 */
	static append() {
		// console.log('target', target);
		try {
			const body = document.querySelector('body');
			const parent = document.createElement('div');
			const el = `<div class="loading-overlay -visible">
				<div data-loading class="loading">
					<svg class="loading-svg" viewBox="-75 -75 150 150">
						<circle cx="0" cy="0" r="37.5" />
					</svg>
				</div>
			</div>`;

			parent.innerHTML = el;
			body.appendChild(parent.firstChild);
		} catch(err) {
			console.log(err.message);
		}
	}

	/**
	 * Remove the loading overlay from the target
	 * or - if unspecified - a selector that matches
	 * the default '.loading-overlay' selector.
	 * @param  {Element} target The target HTML element.
	 */
	static removeFrom(target = null) {
		try {
			target = target ? target : document.querySelector('.loading-overlay');
			target.classList.remove('-visible');

			window.setTimeout(() => {
				target.parentNode.removeChild(target);
			}, 400);
		} catch(err) {
			if (this.debug) console.log(err.message);
		}
	}
}
