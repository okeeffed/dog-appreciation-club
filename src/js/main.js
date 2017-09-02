import Doggo from './modules/doggo';





function fn(){
	const doge = new Doggo();
	doge.init();
}
// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  fn();
} else {
  document.addEventListener('DOMContentLoaded', fn);
}



