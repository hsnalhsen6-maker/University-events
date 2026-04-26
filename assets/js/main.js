document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const alertBox = document.getElementById('formAlert'); // Fixed ID mismatch

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple Email Regex Validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '' || email === '' || message === '') {
                showAlert('يرجى تعبئة جميع الحقول المطلوبة.', 'danger');
            } else if (!emailPattern.test(email)) {
                showAlert('يرجى إدخال بريد إلكتروني صالح.', 'warning');
            } else {
                showAlert('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');
                contactForm.reset(); // Clear form
            }
        });
    }

    // Alert Helper Function using Bootstrap Alert classes
    function showAlert(message, type) {
        if (!alertBox) return;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    // 2. Filter Functionality (Combined Category, Date & Search)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dateFilter = document.getElementById('dateFilter');
    const searchInput = document.getElementById('searchInput');
    const eventCards = document.querySelectorAll('.event-item');

    let activeCategory = 'all';
    let activeDate = '';
    let searchQuery = '';

    function filterEvents() {
        let visibleCount = 0;
        eventCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const date = card.getAttribute('data-date');
            const title = card.querySelector('.card-title').innerText.toLowerCase();
            
            const categoryMatch = activeCategory === 'all' || category === activeCategory;
            const dateMatch = activeDate === '' || date === activeDate;
            const searchMatch = title.includes(searchQuery.toLowerCase());

            if (categoryMatch && dateMatch && searchMatch) {
                card.style.display = 'block';
                card.classList.add('animate-in');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-in');
            }
        });

        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0) noResults.classList.remove('d-none');
            else noResults.classList.add('d-none');
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.getAttribute('data-filter');
            filterEvents();
        });
    });

    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            activeDate = this.value;
            filterEvents();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            filterEvents();
        });
    }

    // 3. Highlight Active Navigation Link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active-nav');
        }
    });
});

// 4. DARK MODE
const toggle = document.getElementById('darkToggle');

if (toggle) {
  if(localStorage.getItem('dark')==='on') document.body.classList.add('dark');

  toggle.onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark') ? 'on' : 'off');
  };
}

// 4. SCROLL BUTTON
const btn=document.getElementById('scrollTop');
window.onscroll=()=>btn.style.display=window.scrollY>200?'block':'none';
btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

