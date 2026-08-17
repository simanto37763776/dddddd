const workTrack = document.querySelector('.work-track');
const previousWork = document.querySelector('.work-arrow-left');
const nextWork = document.querySelector('.work-arrow-right');
const workSlides = document.querySelectorAll('.work-slide');
let activeWorkSlide = 0;

function showWorkSlide(index) {
  activeWorkSlide = (index + workSlides.length) % workSlides.length;
  workTrack.style.transform = `translateX(-${activeWorkSlide * 100}%)`;
}

previousWork?.addEventListener('click', () => showWorkSlide(activeWorkSlide - 1));
nextWork?.addEventListener('click', () => showWorkSlide(activeWorkSlide + 1));

const reviewsTrack = document.querySelector('.reviews-track');
const reviewsViewport = document.querySelector('.reviews-viewport');
const previousReview = document.querySelector('.review-arrow-left');
const nextReview = document.querySelector('.review-arrow-right');
let reviewPosition = 0;
let reviewPauseUntil = 0;

function moveReviews(amount) {
  if (!reviewsTrack) return;
  const firstReview = reviewsTrack.querySelector('.review-card');
  const gap = Number.parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
  const loopWidth = (firstReview.offsetWidth + gap) * (reviewsTrack.children.length / 2);
  reviewPosition = (reviewPosition + amount + loopWidth) % loopWidth;
  reviewsTrack.style.transform = `translateX(-${reviewPosition}px)`;
}

function animateReviews() {
  if (Date.now() > reviewPauseUntil) {
    reviewsTrack.style.transition = 'none';
    moveReviews(.18);
  }
  requestAnimationFrame(animateReviews);
}

function slideOneReview(direction) {
  if (!reviewsTrack) return;
  const firstReview = reviewsTrack.querySelector('.review-card');
  const gap = Number.parseFloat(getComputedStyle(reviewsTrack).gap) || 0;
  reviewsTrack.style.transition = 'transform .78s cubic-bezier(.22, .61, .36, 1)';
  reviewPauseUntil = Date.now() + 820;
  moveReviews(direction * (firstReview.offsetWidth + gap));
}

previousReview?.addEventListener('click', () => slideOneReview(-1));
nextReview?.addEventListener('click', () => slideOneReview(1));
if (reviewsTrack) requestAnimationFrame(animateReviews);

document.querySelectorAll('.video-tile iframe').forEach((iframe) => {
  const revealVideo = () => iframe.closest('.video-tile')?.classList.add('is-loaded');
  const player = new Vimeo.Player(iframe);
  player.on('playing', revealVideo);
});
