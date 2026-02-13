// Book Album
let currentPage = 1;
const totalPages = 6;

function updateBook(){
  for(let i = 1; i <= totalPages; i++){
    const page = document.getElementById(`page${i}`);
    if(page){
      if(i < currentPage){
        page.classList.add('turned');
        page.style.zIndex = i;
      }else if(i === currentPage){
        page.classList.remove('turned');
        page.style.zIndex = totalPages;
      }else{
        page.classList.remove('turned');
        page.style.zIndex = totalPages - i;
      }
    }
  }
  document.getElementById('pageNum').textContent = `Page ${currentPage} of ${totalPages}`;
}

function nextPage(){
  if(currentPage < totalPages){
    currentPage++;
    updateBook();
  }
}

function prevPage(){
  if(currentPage > 1){
    currentPage--;
    updateBook();
  }
}

// Initialize book on load
window.addEventListener('load', updateBook);

// Music
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');

function toggleMusic(){ 
  if(music.paused){
    music.play().catch(e => console.log('Play failed:', e));
    musicBtn.innerHTML = '⏸️ Pause';
  }else{
    music.pause();
    musicBtn.innerHTML = '▶️ Play';
  }
}

function setVolume(v){ 
  music.volume = v; 
}

// Set initial volume and try to play
music.volume = 0.7;
music.play().catch(e => {
  musicBtn.innerHTML = '▶️ Play';
});

// Envelope
let envelopeOpened = false;

function openEnvelope(){
  if(!envelopeOpened){
    document.querySelector('.envelope-wrapper').classList.add('opened');
    envelopeOpened = true;
  }
}

// Typewriter
const text = "My love, every heartbeat whispers your name. You are my today and all my tomorrows ❤️";
let i=0;
function type(){
  if(i<text.length){
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(type,80);
  }
}
setTimeout(type, 1000);

// Lightbox with navigation
const images = [
  'https://picsum.photos/300?1',
  'https://picsum.photos/300?2',
  'https://picsum.photos/300?3'
];
let currentIndex = 0;

function openLightbox(src){
  currentIndex = images.indexOf(src);
  document.getElementById("lightbox").style.display="flex";
  document.getElementById("lightboxImg").src=src;
}

function closeLightbox(){
  document.getElementById("lightbox").style.display="none";
}

function nextImage(){
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("lightboxImg").src = images[currentIndex];
}

function prevImage(){
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("lightboxImg").src = images[currentIndex];
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if(document.getElementById("lightbox").style.display === "flex"){
    if(e.key === 'ArrowRight') nextImage();
    if(e.key === 'ArrowLeft') prevImage();
    if(e.key === 'Escape') closeLightbox();
  }
});

// Surprise
const surprises = [
  "💖 You are my forever Valentine 💖",
  "🌟 You light up my world every single day 🌟",
  "💕 I fall in love with you more each moment 💕",
  "✨ You're the best thing that ever happened to me ✨",
  "💝 My heart belongs to you, always and forever 💝"
];
let surpriseIndex = 0;
let giftOpened = false;

function surprise(){
  const giftBox = document.querySelector('.gift-box');
  const surpriseText = document.getElementById("surpriseText");
  const confettiContainer = document.getElementById('confetti');
  
  if(!giftOpened){
    giftBox.classList.add('opened');
    giftOpened = true;
    createConfetti(confettiContainer);
  }
  
  surpriseText.innerHTML = surprises[surpriseIndex];
  surpriseIndex = (surpriseIndex + 1) % surprises.length;
}

function createConfetti(container){
  const colors = ['#ff6b9d','#ffd700','#ff2f6d','#fff','#ff85a2'];
  for(let i = 0; i < 50; i++){
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}
