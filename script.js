const step1Choices = document.querySelectorAll('#choicesStep1 .choice');
const step2Choices = document.querySelectorAll('#choicesStep2 .choice');
const btnNextStep1 = document.getElementById('nextToStep2');
const btnNextStep2 = document.getElementById('nextToResults');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const mainContainer = document.getElementById('mainContainer');
const resultsContainer = document.getElementById('resultsContainer');
const restartBtn = document.getElementById('restartBtn');

let selectedStep1 = null;
let selectedStep2 = null;

// الدالة لتحديد الاختيار في أي خطوة
function selectChoice(choicesNodeList, selectedValue, step) {
  choicesNodeList.forEach(choice => {
    if(choice.dataset.value === selectedValue) {
      choice.classList.add('selected');
      // تغيير الخلفية وفق اللون المخزن
      mainContainer.style.backgroundColor = choice.dataset.bgcolor;
    } else {
      choice.classList.remove('selected');
    }
  });
  if (step === 1) {
    selectedStep1 = selectedValue;
    btnNextStep1.disabled = false;
  } else if (step === 2) {
    selectedStep2 = selectedValue;
    btnNextStep2.disabled = false;
  }
}

// التعامل مع اختيار الخطوة 1
step1Choices.forEach(choice => {
  choice.addEventListener('click', () => {
    selectChoice(step1Choices, choice.dataset.value, 1);
  });
});

// التعامل مع اختيار الخطوة 2
step2Choices.forEach(choice => {
  choice.addEventListener('click', () => {
    selectChoice(step2Choices, choice.dataset.value, 2);
  });
});

// الانتقال من خطوة 1 إلى 2
btnNextStep1.addEventListener('click', () => {
  if(selectedStep1) {
    step1.classList.remove('active');
    step2.classList.add('active');
    btnNextStep2.disabled = true;
    // تحديث الخلفية الأولى للعطر بعد اختيار النوع
    updateBackground(selectedStep1);
  }
});

// الانتقال من خطوة 2 إلى 3 وعرض النتائج
btnNextStep2.addEventListener('click', () => {
  if(selectedStep2) {
    step2.classList.remove('active');
    step3.classList.add('active');
    // عرض التوصيات حسب الاختيارات
    showResults(selectedStep1, selectedStep2);
  }
});

// زر تجديد الاختبار
restartBtn.addEventListener('click', () => {
  step3.classList.remove('active');
  step1.classList.add('active');
  btnNextStep1.disabled = true;
  btnNextStep2.disabled = true;
  selectedStep1 = null;
  selectedStep2 = null;
  mainContainer.style.backgroundColor = '#f3e7dc';
  // إزالة التحديد
  step1Choices.forEach(c => c.classList.remove('selected'));
  step2Choices.forEach(c => c.classList.remove('selected'));
  resultsContainer.innerHTML = '';
  document.getElementById('questionText').textContent = 'إيه إحساسك اللي بتدور عليه النهارده؟';
});

// تغيير الخلفية حسب اختيار نوع الرائحة (للمزيد من التحكم لو احتجنا)
function updateBackground(value) {
  const colorMap = {
    'زهور': '#fce7e7',
    'أخشاب': '#e0d9c9',
    'فواكه': '#fcf1da',
    'نوتات عطرية': '#d6f0f0'
  };
  mainContainer.style.backgroundColor = colorMap[value] || '#f3e7dc';
}


// بيانات العطور حسب التفضيل (كمثال، يمكن تعديلها لاحقًا)
const perfumes = [
  {
    id: 1,
    name: 'عطر الطيف الوردي',
    category: 'زهور',
    timing: ['بالنهار', 'في مناسبة خاصة'],
    description: 'روائح زهور ناعمة تنعش حواسك.',
    image:''
  },
  {
    id: 2,
    name: 'عطر الغابة العميقة',
    category: 'أخشاب',
    timing: ['بالليل', 'في مناسبة خاصة'],
    description: 'عطر خشبي دافئ مع لمسات غامضة.',
    image: 'عطرالغابه العميقه.jpeg'
  },
  {
    id: 3,
    name: 'عطر الفواكه المشمشي',
    category: 'فواكه',
    timing: ['بالنهار'],
    description: 'عبير فاكهي منعش يعبق بالحيوية.',
    image: 'عطرالفواكه المشمشى.jpeg'
  },
  {
    id: 4,
    name: 'عطر النسيم العطري',
    category: 'نوتات عطرية',
    timing: ['بالنهار', 'بالليل'],
    description: 'مزيج مثالي من النوتات العطرية الفريدة.',
    image: 'عطرالنسيم العطرى.jpeg'
  },
  {
    id: 5,
    name: 'عطر النسيم العطري',
     
    category: 'أخشاب',
    timing: ['بالليل', 'في مناسبة خاصة'],
    description: 'رائحة فاخرة تجمع بين الأناقة والغموض.',
    image: 'https://i.ibb.co/BBXpycT/night-royal.jpg'
  },
  {
    id: 6,
    name: 'عطر الفاكهة الملكي',
    category: 'فواكه',
    timing: ['في مناسبة خاصة', 'بالليل'],
    description: 'نفحات فاكهية ملكية لا تقاوم.',
    image: 'عطرالفاكه المالكى.jpeg'
  }
];

// تصميم واظهار نتائج التوصيات
function showResults(category, timing) {
  // تصفية العطور حسب التفضيل
  const filteredPerfumes = perfumes.filter(p => p.category === category && p.timing.includes(timing)).slice(0, 3);

  if(filteredPerfumes.length === 0) {
    resultsContainer.innerHTML = `<p>معذرة، لا توجد توصيات تناسب اختياراتك الآن.</p>`;
    return;
  }
  resultsContainer.innerHTML = '';
  filteredPerfumes.forEach((perfume, index) => {
    const item = document.createElement('div');
    item.classList.add('result-item');
    item.style.animationDelay = `${0.2 + index * 0.2}s`;
    item.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}" />
      <div class="result-info">
        <h3>${perfume.name}</h3>
        <p>${perfume.description}</p>
      </div>
    `;
    resultsContainer.appendChild(item);
  });
}
