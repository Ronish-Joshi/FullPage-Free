let a = document.querySelector('a');
let one = document.querySelector('.main-container');
let mouseDown = false;
let startY;
let scrollTop;
let dots = document.querySelector('.dots')

//Setting Up ID's in pages\

let pages = document.querySelectorAll('.page');
for(let i = 0; i < pages.length;i++){
	pages[i].setAttribute('id',`pg${i}`);
	dots.innerHTML += '<dot></dot>';
}

let dot = document.querySelectorAll('dot');

for(let i = 0; i < dot.length; i++){
	dot[i].setAttribute('id',`dt${i}`);
}

//Intersection Obeserver

let options = {
	threshold: 0.001
}

let observer = new IntersectionObserver(pageCheck,options);

function pageCheck(entries){
	entries.forEach(function(entry){
		if(entry.isIntersecting){
			a.setAttribute('href',`#${entry.target.id}`);
			a.click();

			//for the DOTS
			let split = entry.target.id.split('');
			let no = split[split.length-1];
			
			document.getElementById(`dt${no}`).style.setProperty('width','10px');
			document.getElementById(`dt${no}`).style.setProperty('height','10px');
			document.getElementById(`dt${no}`).style.setProperty('transform','translateX(-30%)');
			//for the key events
			window.onkeyup = function(e){
				if(e.keyCode == 40){
					let splitted = entry.target.id.split('');
					let numberForAttribute = Number(splitted[splitted.length-1])+1;
					a.setAttribute('href',`#pg${numberForAttribute}`);
					a.click();
				}else if (e.keyCode == 38) {
					let splitted = entry.target.id.split('');
					let numberForAttribute = Number(splitted[splitted.length-1])-1;
					if (numberForAttribute < 0) {numberForAttribute = 0}
					a.setAttribute('href',`#pg${numberForAttribute}`);
					a.click();
				}
			}
		}else{

			//for the DOTS
			let split = entry.target.id.split('');
			let no = split[split.length-1];
			
			document.getElementById(`dt${no}`).style.setProperty('width','2px');
			document.getElementById(`dt${no}`).style.setProperty('height','2px');
			document.getElementById(`dt${no}`).style.setProperty('transform','translateX(-30%)');
		}
	});
}

pages.forEach(function(page){
	observer.observe(page);
});


//Drag And Scroll 

one.addEventListener('mousedown',function(e){
	mouseDown = true;
	startY = e.pageY - one.offsetTop; 
	scrollTop = one.scrollTop;
	scrollBehaviour = false;
	//one.style.removeProperty('scroll-behavior');
});

one.addEventListener('mouseup',function(e){
	mouseDown = false;
	//one.style.setProperty('scroll-behavior','smooth');
})
one.addEventListener('mouseleave',function(e){
	mouseDown = false;
})
one.addEventListener('mousemove',function(e){
	if(!mouseDown) return;
	
	e.preventDefault();
	const x = e.pageY - one.offsetTop;
	const move = x - startY;
	one.scrollTop = scrollTop -  move;
	
});

