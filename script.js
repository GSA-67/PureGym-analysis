/* ================================================= */
/* 核心策略及提示內容列表 (新增) */
/* ================================================= */
const coreStrategyTips = [
    // 你的所有策略/提示內容都放在這裡
    "Based on PureGym’s market positioning and cost structure analysis, our recommended core strategy is: Focus on a <b>low cost, high flexibility</b> membership model and actively pioneer the <b>second-tier city</b> market.",
    "<b>Business Model Insight:</b> PureGym's success hinges on its <b>low labour cost</b> operating model, powered by superior technology for member self-service and 24/7 access.",
    "<b>Key Differentiator:</b> The <b>no-contract, 24/7 access</b> proposition directly targets young professionals and shift workers, catering to the demand for maximum flexibility.",
    "<b>Market Rivalry:</b> PureGym's main budget competitor in the UK is <b>The Gym Group</b>. Both operate in the value segment, contrasting with premium chains like David Lloyd.",
    "<b>Target Market Focus:</b> The core demographic for PureGym is typically <b> 18 to 44 years old</b>, who are cost-conscious but demand high-quality equipment.",
    "<b>Expansion Strategy:</b> Future growth focuses on maximizing existing estate performance and <b>accelerating new high-quality site openings</b> in both the UK and international markets.",
    "<b>Threat Analysis:</b> A major financial risk is the <b>continued high inflation</b> squeezing UK consumers' disposable income, which could lead to non-essential membership cancellations.",
    "<b>Technological Edge:</b> Digital membership management allows PureGym to achieve paperless administration and minimize the need for a physical front desk.",
];

// 函數：從陣列中隨機選擇一個提示
function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * coreStrategyTips.length);
    return coreStrategyTips[randomIndex];
}
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // 功能 1: 點擊按鈕顯示/隱藏結論 (index.html)   
    // 功能 2: 點擊按鈕隨機顯示提示 (index.html)
    const revealButton = document.getElementById('reveal-button');
    const conclusionText = document.getElementById('hidden-conclusion');

    if (revealButton && conclusionText) {
        // 每次點擊按鈕時，都會執行以下函數
        revealButton.addEventListener('click', function() {
            
            // 1. 隨機獲取一個提示內容，並使用 innerHTML 顯示
            conclusionText.innerHTML = getRandomTip();
            
            // 2. 確保內容是顯示狀態
            conclusionText.style.display = 'block'; 
            
            // 3. 改變按鈕文字，引導用戶點擊下一個
            revealButton.textContent = 'Show a different tip';

            /* ================================================= */
    /* 功能 4: 手機漢堡選單切換 (Hamburger Menu) - 新增功能 */
    /* ================================================= */

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            // 切換 CSS 類別來實現選單展開/收起
            mobileMenu.classList.toggle('expanded');
            
            // 設置 ARIA 屬性以提高可訪問性 (Accessibility)
            const isExpanded = mobileMenu.classList.contains('expanded');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // 可選：當用戶點擊選單連結後，自動收起選單
        const navLinks = mobileMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('expanded');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
        });
        
        // 確保頁面載入時結論是隱藏的
        conclusionText.style.display = 'none';
    }
    
    // 功能 2: 自動更新頁尾年份 (所有頁面)
    const yearSpan = document.getElementById('last-updated');
    const currentYear = new Date().getFullYear();
    if (yearSpan) {
        yearSpan.textContent = `Last updated year:${currentYear}`;
    }

    /* ================================================= */
    /* 功能 3: 聯繫表單驗證 (contact.html) - 新增功能 */
    /* ================================================= */

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // 輔助函數：顯示錯誤訊息
        function displayError(inputElement, message) {
            const formGroup = inputElement.closest('.form-group');
            const errorElement = document.getElementById(inputElement.id + '-error');
            
            formGroup.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // 輔助函數：清除錯誤訊息
        function clearError(inputElement) {
            const formGroup = inputElement.closest('.form-group');
            const errorElement = document.getElementById(inputElement.id + '-error');
            
            formGroup.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        // 驗證邏輯
        function validateInput(input) {
            clearError(input); // 先清除之前的錯誤
            let isValid = true;
            
            if (input.required && input.value.trim() === '') {
                displayError(input, 'This field is required.');
                isValid = false;
            } else if (input.type === 'email') {
                // 簡易 Email 正則表達式
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    displayError(input, 'Please enter a valid email address.');
                    isValid = false;
                }
            } else if (input.id === 'name' && input.value.trim().length < 2) {
                displayError(input, 'Your name must contain at least 2 characters.');
                isValid = false;
            } else if (input.id === 'message' && input.value.trim().length < 10) {
                displayError(input, 'The message must contain at least 10 characters.');
                isValid = false;
            }
            return isValid;
        }

        // 監聽所有輸入框的輸入事件，實現即時驗證
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                // 用戶開始輸入後，一旦欄位有效就清除錯誤
                if (input.value.trim() !== '') {
                    validateInput(input);
                }
            });
        });

        // 監聽表單提交事件
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止預設提交
            let allValid = true;
            
            formInputs.forEach(input => {
                // 對所有必填欄位進行驗證
                if (!validateInput(input)) {
                    allValid = false;
                }
            });

            if (allValid) {
                // 這裡可以加入 AJAX 提交邏輯，或者簡單地：
                alert('Message sent successfully! (Form submission is handled by JS validation)');
                contactForm.reset(); // 提交成功後重設表單
                // 實際部署時，這裡應該是 contactForm.submit(); 以便提交到伺服器或 Formspree。
            } else {
                alert('Please correct the errors in the form before submitting.');
                // 將視圖滾動到第一個錯誤欄位
                const firstError = document.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    }

    // 如果需要，可以在這裡添加。
});

