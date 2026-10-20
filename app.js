const scene = document.getElementById('scene');
const solarSystem = document.getElementById('solar-system');
const planetsContainer = document.getElementById('planets-container');
const modal = document.getElementById('info-modal');
const closeBtn = document.getElementById('close-btn');

const planetsData = [
    { name: 'Mercury', color: '#9c9c9c', size: 18, dist: 130, speed: 0.04, type: 'Terrestrial', realDist: '57.9M km', period: '88 Days', desc: 'Mercury is the smallest planet in the Solar System and the closest to the Sun.' },
    { name: 'Venus', color: '#e6b800', size: 24, dist: 180, speed: 0.015, type: 'Terrestrial', realDist: '108.2M km', period: '225 Days', desc: 'Venus is the second planet from the Sun. It is a rocky planet with a toxic atmosphere.' },
    { name: 'Earth', color: '#00ccff', size: 26, dist: 240, speed: 0.01, type: 'Terrestrial', realDist: '149.6M km', period: '365.25 Days', desc: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life.' },
    { name: 'Mars', color: '#ff3300', size: 20, dist: 300, speed: 0.008, type: 'Terrestrial', realDist: '227.9M km', period: '687 Days', desc: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.' },
    { name: 'Jupiter', color: '#ff9966', size: 50, dist: 400, speed: 0.004, type: 'Gas Giant', realDist: '778.5M km', period: '12 Years', desc: 'Jupiter is the largest planet in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.' },
    { name: 'Saturn', color: '#ffcc99', size: 44, dist: 510, speed: 0.002, type: 'Gas Giant', realDist: '1.4B km', period: '29 Years', desc: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, known for its spectacular ring system.' },
    { name: 'Uranus', color: '#66ffff', size: 34, dist: 610, speed: 0.001, type: 'Ice Giant', realDist: '2.9B km', period: '84 Years', desc: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.' },
    { name: 'Neptune', color: '#3366ff', size: 34, dist: 700, speed: 0.0008, type: 'Ice Giant', realDist: '4.5B km', period: '165 Years', desc: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is the fourth-largest planet by diameter.' }
];

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationVelocity = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let time = 0;

const planets = [];

function init() {
    planetsData.forEach((data, index) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${data.dist * 2}px`;
        orbit.style.height = `${data.dist * 2}px`;
        orbit.style.transform = `translate(-50%, -50%) rotateX(75deg)`;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'planet-wrapper';
        
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.style.width = `${data.size}px`;
        planet.style.height = `${data.size}px`;
        planet.style.backgroundColor = data.color;
        planet.style.color = data.color;

        if (data.name === 'Saturn') {
            const ring = document.createElement('div');
            ring.className = 'saturn-ring';
            planet.appendChild(ring);
        }

        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = data.name;
        planet.appendChild(label);

        wrapper.appendChild(planet);
        orbit.appendChild(wrapper);
        planetsContainer.appendChild(orbit);

        planets.push({
            data,
            element: planet,
            wrapper: wrapper,
            orbit: orbit,
            angle: Math.random() * Math.PI * 2
        });

        planet.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(data);
        });
    });
}

function updatePositions() {
    planets.forEach(p => {
        p.angle += p.data.speed;
        const x = Math.cos(p.angle) * p.data.dist;
        const y = Math.sin(p.angle) * p.data.dist;
        p.wrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
}

function render() {
    if (!isDragging) {
        currentRotation.x += rotationVelocity.x;
        currentRotation.y += rotationVelocity.y;
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
    }
    
    solarSystem.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
    
    updatePositions();
    requestAnimationFrame(render);
}

scene.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.offsetX - previousMousePosition.x;
    const deltaY = e.offsetY - previousMousePosition.y;
    
    rotationVelocity.y = deltaX * 0.5;
    rotationVelocity.x = -deltaY * 0.5;
    
    currentRotation.y += rotationVelocity.y;
    currentRotation.x += rotationVelocity.x;
    
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

scene.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;
    
    rotationVelocity.y = deltaX * 0.5;
    rotationVelocity.x = -deltaY * 0.5;
    
    currentRotation.y += rotationVelocity.y;
    currentRotation.x += rotationVelocity.x;
    
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: false });

window.addEventListener('touchend', () => {
    isDragging = false;
});

function openModal(data) {
    document.getElementById('planet-name').textContent = data.name.toUpperCase();
    document.getElementById('planet-name').style.color = data.color;
    document.getElementById('planet-name').style.textShadow = `0 0 10px ${data.color}`;
    document.getElementById('planet-type').textContent = data.type;
    document.getElementById('planet-dist').textContent = data.realDist;
    document.getElementById('planet-period').textContent = data.period;
    document.getElementById('planet-desc').textContent = data.desc;
    
    modal.classList.add('active');
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

const sunEl = document.getElementById('sun');
sunEl.addEventListener('click', () => {
    openModal({
        name: 'The Sun',
        color: '#ff8c00',
        type: 'Yellow Dwarf Star',
        realDist: '0 km',
        period: 'N/A',
        desc: 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.'
    });
});

init();
render();