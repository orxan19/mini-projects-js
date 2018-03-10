const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



function togglePlay(){
	var method = video.paused;
	if (method){
		video.play();
	}
	else{
		video.pause();
	}
}

function upDateButton(){

	var icon;
	const flag = this.paused;
	if(flag){
		icon = '►';
	}
	else {
		icon = '❚ ❚';
	}

	toggle.textContent = icon;
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress(){
	const upDateTime = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${upDateTime}%`;
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function scrub(e){
	var current = (e.offsetX / this.offsetWidth) * video.duration;
	video.currentTime = current;
	
}




//addeventlisteners

video.addEventListener("click", togglePlay);
video.addEventListener("play", upDateButton);
video.addEventListener("pause", upDateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
	if(mousedown){
		scrub();
	};

});
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);



