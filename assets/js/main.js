const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputWeight = e.target.querySelector('#weight');
    const inputHeight = e.target.querySelector('#height');

    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);

    checkValues (weight, height);
});

function createElementP () {
    const p = document.createElement('p');
    return p;
}

function checkValues (weight, height) {
    if (!weight && !height) {
        setResult ('Peso e Altura inválidos', false);
        return;
    }

    if (!weight) {
        setResult ('Peso inválido', false);
        return;
    }

    if (!height) {
        setResult ('Altura inválida', false);
        return;
    }

    const BMI = calculateBMI (weight, height);
    const BMILevel = showBMI (BMI);

    const message = `Seu IMC é: ${BMI}. ${BMILevel}`;

    setResult (message, true);
}

function setResult (message, isValid) {
    const result = document.getElementById('result');
    result.innerHTML = '';

    const p = createElementP();
    isValid ? p.classList.add ('result-paragraph-successfully') : p.classList.add ('result-paragraph-unsuccessfully');
    p.innerHTML = message;
    result.appendChild(p);
}

function calculateBMI (weight, height) {
    height >= 100 ? height /= 100 : height;
    const BMI = weight / Math.pow(height, 2);
    return BMI.toFixed(2);
}

function showBMI (BMI) {
    const BMILevels = [
        'Abaixo do peso', 
        'Peso normal', 
        'Sobrepeso', 
        'Obesidade grau 1', 
        'Obesidade grau 2', 
        'Obesidade grau 3'
    ];

    if (BMI >= 39.9) return BMILevels[5];
    if (BMI >= 34.9) return BMILevels[4];
    if (BMI >= 29.9) return BMILevels[3];
    if (BMI >= 24.9) return BMILevels[2];
    if (BMI >= 18.5) return BMILevels[1];
    if (BMI < 18.5) return BMILevels[0];
}