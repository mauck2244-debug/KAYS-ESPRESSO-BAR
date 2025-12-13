// เมนูแฮมเบอร์เกอร์ (Hamburger Menu)
// เลือก Element ที่ต้องการ
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// เมื่อกดปุ่ม Hamburger
hamburger.addEventListener("click", () => {
    // สลับ class 'active' ไปมา (ถ้ามีก็เอาออก ถ้าไม่มีก็ใส่)
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// (เสริม) เมื่อกดลิงก์ในเมนู ให้ปิดเมนูอัตโนมัติ
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// 1. เลือกปุ่มเมนูทั้งหมด และ รายการอาหารทั้งหมด
const menuBtns = document.querySelectorAll('.cat-btn');
const foodItems = document.querySelectorAll('.menu-item');

// 2. วนลูปสร้างคำสั่งให้ปุ่มทุกปุ่ม
menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {

        // --- ส่วนที่ 1: เปลี่ยนสีปุ่ม (Visual) ---
        // เอา class 'active' ออกจากทุกปุ่มก่อน
        menuBtns.forEach(b => b.classList.remove('active'));
        // ใส่ class 'active' ให้ปุ่มที่เพิ่งกด
        btn.classList.add('active');

        // --- ส่วนที่ 2: กรองข้อมูล (Filtering) ---
        const targetCat = btn.getAttribute('data-target'); // ดึงค่าหมวดหมู่จากปุ่มที่กด

        foodItems.forEach((item) => {
            // ดึงค่าหมวดหมู่ของอาหารจานนั้นๆ
            const itemCat = item.getAttribute('data-category');

            if (targetCat === 'all' || targetCat === itemCat) {
                // ถ้ากด "ทั้งหมด" หรือ หมวดหมู่ตรงกัน -> ให้แสดง
                item.style.display = 'block';

                // (Optional) ใส่ Animation เล็กๆ ให้ดูนุ่มนวล
                item.style.animation = 'fadeIn 0.5s';
            } else {
                // ถ้าไม่ตรง -> ให้ซ่อน
                item.style.display = 'none';
            }
        });
    });
});

let currentIndex = 0; // เก็บว่าตอนนี้อยู่ที่ภาพไหน (เริ่มที่ 0)
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide-item');
const totalSlides = slides.length;

// ฟังก์ชันเลื่อนสไลด์
function updateSlider() {
    // คำนวณระยะเลื่อน: ถ้าภาพที่ 1 (index 0) เลื่อน 0%, ภาพที่ 2 (index 1) เลื่อน -100%
    const translateValue = -(currentIndex * 100) + '%';
    track.style.transform = 'translateX(' + translateValue + ')';
}

// ฟังก์ชันสำหรับปุ่มกด (n เป็น -1 หรือ 1)
function moveSlide(n) {
    currentIndex += n;

    // ถ้ากดเลยภาพสุดท้าย -> วนกลับไปภาพแรก
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    // ถ้ากดถอยหลังเลยภาพแรก -> วนไปภาพสุดท้าย
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    updateSlider();

    // (Optional) รีเซ็ตเวลา Auto Slide เมื่อมีการกดปุ่ม
    resetTimer();
}

let autoSlideInterval = setInterval(() => {
    moveSlide(1);
}, 6000);

function resetTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 6000);
}