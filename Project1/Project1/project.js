const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


function showDetail(title, media, description, tags) {
  const detail = document.getElementById('project-detail');
  const img = document.getElementById('detail-media');
  const h2 = document.getElementById('detail-title');
  const p = document.getElementById('detail-description');
  const tagsContainer = document.getElementById('detail-tags');

  // Set content
  img.src = media;
  img.alt = title;
  h2.textContent = title;
  p.textContent = description;

  // Clear and add tags
  tagsContainer.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  // Show the detail section
  detail.classList.remove('hidden');

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
