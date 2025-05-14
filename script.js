document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();

    document.getElementById('calculate-btn').addEventListener('click', calculateLove);
    document.getElementById('recalculate-btn').addEventListener('click', resetCalculator);
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartColors = ['#ff6b6b', '#ff4b7d', '#ffb6c1', '#ffffff'];
    const heartIcons = ['♥', '❤', '♡', '💕', '💖', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        const size = Math.floor(Math.random() * 30) + 10; 
        const posX = Math.floor(Math.random() * 100); 
        const delay = Math.random() * 5; 
        const duration = Math.random() * 10 + 10; 
        const rotation = Math.random() * 360; 
        const heartColor = heartColors[Math.floor(Math.random() * heartColors.length)];
        const heartIcon = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        heart.style.left = `${posX}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.color = heartColor;
        heart.innerHTML = heartIcon;
        
        heartsContainer.appendChild(heart);
    }
}

function createConfetti(percentage) {
    const container = document.querySelector('.container');
    const confettiColors = ['#ff6b6b', '#ff4b7d', '#ffb6c1', '#ffecd2', '#fcb69f', '#fad0c4'];
    
    const confettiCount = Math.floor(percentage / 2) + 10;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const size = Math.floor(Math.random() * 6) + 5; 
        const posX = Math.floor(Math.random() * 100); 
        const posY = Math.floor(Math.random() * 20) - 20; 
        const delay = Math.random() * 3; 
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${posX}%`;
        confetti.style.top = `${posY}%`;
        confetti.style.backgroundColor = color;
        confetti.style.animationDelay = `${delay}s`;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000 + (delay * 1000));
    }
}

function calculateLove() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        shakeInputs();
        return;
    }
    
    const calculatorBox = document.querySelector('.calculator-box');
    calculatorBox.classList.add('flip-animation');
    setTimeout(() => {
        calculatorBox.classList.add('flipped');
    }, 100);
    
    setTimeout(() => {
        const resultElement = document.getElementById('result');
        resultElement.classList.add('result-visible');
        
        document.getElementById('result-name1').textContent = name1;
        document.getElementById('result-name2').textContent = name2;
        
        const percentage = calculatePercentage(name1, name2);
        
        animatePercentage(percentage);
        
        setTimeout(() => {
            document.getElementById('love-message').textContent = getLoveMessage(percentage);
        }, 1500);
        
        if (percentage > 70) {
            createConfetti(percentage);
        }
        
        calculatorBox.classList.remove('flip-animation', 'flipped');
    }, 800);
}

function animatePercentage(targetPercentage) {
    let currentPercentage = 0;
    const loveBar = document.getElementById('love-bar');
    const percentageDisplay = document.getElementById('love-percentage');
    const animationDuration = 1500;
    const step = 10; 
    const percentageStep = (targetPercentage / animationDuration) * step;
    
    const interval = setInterval(() => {
        currentPercentage += percentageStep;
        
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(interval);
        }
        
        loveBar.style.width = `${currentPercentage}%`;
        percentageDisplay.textContent = `${Math.round(currentPercentage)}%`;
    }, step);
}

function calculatePercentage(name1, name2) {
    name1 = name1.toLowerCase();
    name2 = name2.toLowerCase();
    
    let total = 0;
    
    for (let i = 0; i < name1.length; i++) {
        total += name1.charCodeAt(i);
    }
    
    for (let i = 0; i < name2.length; i++) {
        total += name2.charCodeAt(i);
    }
    
    const uniqueChars = new Set([...name1, ...name2]).size;
    const commonChars = new Set(name1.split('').filter(char => name2.includes(char))).size;
    
    const chemistry = (uniqueChars * commonChars) % 100;
    
    let percentage = (total % 100 + chemistry) / 2;
    
    percentage = Math.max(percentage, 10);
    
    if (name1 === name2) {
        percentage = 100;
    }
    
    const specialCouples = {
        'romeo:juliet': 100,
        'jack:rose': 95,
        'adam:eve': 100,
        'bonnie:clyde': 98,
        'peanut:butter': 100,
        'salt:pepper': 99
    };
    
    const coupleKey = `${name1}:${name2}`;
    const reverseCoupleKey = `${name2}:${name1}`;
    
    if (specialCouples[coupleKey] !== undefined) {
        percentage = specialCouples[coupleKey];
    } else if (specialCouples[reverseCoupleKey] !== undefined) {
        percentage = specialCouples[reverseCoupleKey];
    }
    
    return Math.round(percentage);
}

function getLoveMessage(percentage) {
    if (percentage >= 90) {
        return "Udah Jodoh bersetubuh langsung aja biar cepet";
    } else if (percentage >= 80) {
        return "Aw aw aw Selamat yaa, ini pasangan yang cocok banget";
    } else if (percentage >= 70) {
        return "Sippp ini bisa jadi pasangan ni gas teross";
    } else if (percentage >= 60) {
        return "Anjai ini mayan bisa nih gas terosss";
    } else if (percentage >= 50) {
        return "Ini stabil nih gas teros brok";
    } else if (percentage >= 40) {
        return "Semoga bisa lanjut dari sekedar temen ya ges ya semangat";
    } else if (percentage >= 30) {
        return "Yah Lumayan Lah ada cocok dikit";
    } else if (percentage >= 20) {
        return "Kamu kurang cakep, tp bisa temenan kok hehe";
    } else {
        return "Udah Hts aja hahaha, Sad Ending";
    }
}

function resetCalculator() {
    // Reset inputs
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';
    
    const resultElement = document.getElementById('result');
    resultElement.classList.remove('result-visible');
    
    document.getElementById('love-bar').style.width = '0%';
    document.getElementById('love-percentage').textContent = '0%';
    
    document.getElementById('name1').focus();
}

function shakeInputs() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('animate__animated', 'animate__shakeX');
            input.style.borderColor = '#ff0000';
            
            setTimeout(() => {
                input.classList.remove('animate__animated', 'animate__shakeX');
                input.style.borderColor = '#ffb6c1';
            }, 1000);
        }
    });
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const resultVisible = document.getElementById('result').classList.contains('result-visible');
        
        if (resultVisible) {
            resetCalculator();
        } else {
            calculateLove();
        }
    }
});