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

    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        activeCategory = categoryParam;
        // Update button active state
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === categoryParam) {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
        filterEvents();
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

//...................................................................
const eventsData = {
    '1': {
        title: 'مؤتمر الذكاء الاصطناعي',
        category: 'تكنولوجيا',
        date: '10 حزيران 2026',
        time: '09:00 صباحاً - 05:00 مساءً',
        location: 'قاعة المؤتمرات الكبرى',
        description: 'استكشف عالم الذكاء الاصطناعي وكيف يغير حياتنا اليومية ومستقبل العمل.',
        image: 'assets/img/Ai.jpeg',
        map: 'assets/img/HAMAK.png'
    },
    '2': {
        title: 'البطولة الرياضية السنوية',
        category: 'رياضة',
        date: '20 حزيران 2026',
        time: '08:00 صباحاً - 06:00 مساءً',
        location: 'ملعب تشرين',
        description: 'منافسات رياضية متنوعة تشمل كرة القدم، السلة، والعديد من الألعاب الأخرى.',
        image: 'assets/img/sportcomp.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '3': {
        title: 'ورشة عمل البرمجة',
        category: 'تكنولوجيا',
        date: '15 حزيران 2026',
        time: '10:00 صباحاً - 02:00 ظهراً',
        location: 'كلية الهمك - مبنى المعلوماتية',
        description: 'تعلم أساسيات تطوير الويب باستخدام أحدث التقنيات في هذه الورشة التطبيقية.',
        image: 'assets/img/web.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '4': {
        title: 'الحفل الموسيقي',
        category: 'موسيقى',
        date: '22 حزيران 2026',
        time: '07:00 مساءً - 10:00 مساءً',
        location: 'دار الأوبرا',
        description: 'ليلة موسيقية ساحرة تقدمها فرقة الجامعة بمشاركة فنانين متميزين.',
        image: 'assets/img/concert.jpeg',
        map: 'assets/img/HAMAK.png'
    },
    '5': {
        title: 'العرض المسرحي',
        category: 'ثقافة',
        date: '22 حزيران 2026',
        time: '05:00 مساءً - 07:00 مساءً',
        location: 'دار الأوبرا',
        description: 'عرض مسرحي كوميدي درامي يتناول قضايا الشباب الجامعي بطريقة فنية.',
        image: 'assets/img/msrhy.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '6': {
        title: 'ماراثون الجامعة',
        category: 'رياضة',
        date: '25 حزيران 2026',
        time: '07:00 صباحاً - 10:00 صباحاً',
        location: 'طريق المطار - دمشق',
        description: 'سباق الجري السنوي لطلاب وأساتذة الجامعة، شارك معنا في تعزيز نمط الحياة الصحي.',
        image: 'assets/img/marathon.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '7': {
        title: 'جلسة حوارية: مستقبل العمل',
        category: 'ثقافة',
        date: '28 حزيران 2026',
        time: '11:00 صباحاً - 01:00 ظهراً',
        location: 'قاعة المحاضرات المركزية',
        description: 'جلسة نقاشية مفتوحة حول المهارات المطلوبة في سوق العمل المستقبلي وتأثير التكنولوجيا.',
        image: 'assets/img/dialogue_session.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '8': {
        title: 'يوم البرمجة التفاعلي',
        category: 'تكنولوجيا',
        date: '14 اكتوبر 2026',
        time: '09:00 صباحاً - 04:00 مساءً',
        location: 'مخبر الشبكات - كلية الهمك',
        description: 'يوم كامل من التحديات البرمجية والعمل الجماعي لحل مشكلات تقنية واقعية.',
        image: 'assets/img/program_day.jpg',
        map: 'assets/img/HAMAK.png'
    },
    '9': {
        title: 'ورشة عمل البرمجة 1',
        category: 'تكنولوجيا',
        date: '15 حزيران 2026',
        time: '02:00 ظهراً - 05:00 مساءً',
        location: 'مبنى المعلوماتية - الطابق الثالث',
        description: 'الجزء الأول من سلسلة ورشات العمل التعليمية للطلاب المبتدئين في عالم البرمجة.',
        image: 'assets/img/programming.jpg',
        map: 'assets/img/HAMAK.png'
    }
};
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');


    const event = eventsData[eventId];

    if (event) {
        document.getElementById('eventTitle').innerText = event.title;
        document.getElementById('eventCategory').innerText = event.category;
        document.getElementById('eventDate').innerText = '📅 ' + event.date;
        document.getElementById('eventTime').innerText = '⏰ ' + event.time;
        document.getElementById('eventLocation').innerText = event.location;
        document.getElementById('eventDescription').innerText = event.description;
        document.getElementById('eventImage').src = event.image;
        document.getElementById('eventMap').src = event.map;

        // Load Related Events
        const relatedContainer = document.getElementById('relatedEvents');
        relatedContainer.innerHTML = ''; // Clear placeholder

        const relatedEvents = Object.keys(eventsData)
            .filter(id => id !== eventId && eventsData[id].category === event.category)
            .slice(0, 3); // Limit to 3

        if (relatedEvents.length > 0) {
            relatedEvents.forEach(id => {
                const rel = eventsData[id];
                relatedContainer.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm border-0">
                            <img src="${rel.image}" class="card-img-top" alt="${rel.title}" style="height: 150px; object-fit: cover;">
                            <div class="card-body">
                                <h6 class="card-title fw-bold">${rel.title}</h6>
                                <p class="text-muted small mb-2">📅 ${rel.date}</p>
                                <a href="event.html?id=${id}" class="btn btn-sm btn-outline-primary w-100">التفاصيل</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            
            // If no same-category events, show some other events
            const otherEvents = Object.keys(eventsData)
                .filter(id => id !== eventId)
                .slice(0, 3);
            
            otherEvents.forEach(id => {
                const rel = eventsData[id];
                relatedContainer.innerHTML += `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm border-0">
                            <img src="${rel.image}" class="card-img-top" alt="${rel.title}" style="height: 150px; object-fit: cover;">
                            <div class="card-body">
                                <h6 class="card-title fw-bold">${rel.title}</h6>
                                <p class="text-muted small mb-2">📅 ${rel.date}</p>
                                <a href="event.html?id=${id}" class="btn btn-sm btn-outline-primary w-100">التفاصيل</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } else {
        document.getElementById('eventDetailContent').classList.add('d-none');
        document.getElementById('noEventFound').classList.remove('d-none');
    }
});
