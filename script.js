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

let currentIndex = 0;
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide-item');
const totalSlides = slides.length;

// --- 1. ฟังก์ชันเลื่อนสไลด์ (ของเดิม) ---
function updateSlider() {
    const translateValue = -(currentIndex * 100) + '%';
    track.style.transform = 'translateX(' + translateValue + ')';
}

// --- 2. ฟังก์ชันคำนวณการเปลี่ยนหน้า (ของเดิม) ---
function moveSlide(n) {
    currentIndex += n;

    // วนลูป
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    updateSlider();
    resetTimer(); // ทุกครั้งที่เปลี่ยนหน้า ให้เริ่มนับเวลา Auto ใหม่
}

// --- 3. ระบบ Auto Slide (ของเดิม) ---
let autoSlideInterval = setInterval(() => {
    moveSlide(1);
}, 6000);

function resetTimer() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 6000);
}

// --- 4. ส่วนที่เพิ่มมาใหม่: ระบบจับนิ้วปัด (Touch Swipe) ---

let startX = 0; // จุดที่นิ้วเริ่มแตะ
let endX = 0;   // จุดที่นิ้วปล่อย

// เมื่อนิ้วเริ่มแตะจอ
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // จำตำแหน่งแกน X ที่แตะ
    clearInterval(autoSlideInterval); // หยุด Auto Play ชั่วคราวตอนกำลังจะปัด
}, { passive: true });

// เมื่อนิ้วปล่อยจากจอ
track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX; // จำตำแหน่งสุดท้ายที่ปล่อย
    handleSwipe(); // คำนวณผลลัพธ์
    resetTimer();  // เริ่ม Auto Play ต่อ
});

function handleSwipe() {
    // คำนวณระยะทาง (จุดเริ่ม - จุดจบ)
    let diff = startX - endX;
    
    // กำหนดว่าต้องปัดยาวแค่ไหนถึงจะเปลี่ยนรูป (เช่น 50px)
    let threshold = 50; 

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            // ปัดไปทางซ้าย (ค่าเป็นบวก) -> ไปรูปถัดไป
            moveSlide(1);
        } else {
            // ปัดไปทางขวา (ค่าเป็นลบ) -> ย้อนกลับ
            moveSlide(-1);
        }
    }
}