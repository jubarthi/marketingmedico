// Seleciona todas as etapas do formulário
const steps = document.querySelectorAll('.step');
let currentStep = 0;

// Mostra a etapa correspondente e oculta as demais
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

// Valida os campos da etapa atual
function validateCurrentStep() {
  switch (currentStep) {
    case 0:
      break;
    case 1:
      const emailField = document.getElementById('email');
      if (!emailField.value || !emailField.checkValidity()) {
        emailField.reportValidity();
        return false;
      }
      break;
    case 2:
      const firstField = document.getElementById('firstName');
      const lastField = document.getElementById('lastName');
      if (!firstField.value) {
        firstField.reportValidity();
        return false;
      }
      if (!lastField.value) {
        lastField.reportValidity();
        return false;
      }
      break;
    case 3:
      const phoneField = document.getElementById('phone');
      if (!phoneField.value) {
        phoneField.reportValidity();
        return false;
      }
      break;
    case 4:
      const specialtyField = document.getElementById('specialty');
      if (!specialtyField.value) {
        specialtyField.reportValidity();
        return false;
      }
      break;
    case 5:
      const roleField = document.getElementById('role');
      if (!roleField.value) {
        alert('Por favor, selecione sua função.');
        return false;
      }
      break;
    case 6:
      const billingField = document.getElementById('billing');
      if (!billingField.value) {
        alert('Por favor, selecione sua faixa de faturamento.');
        return false;
      }
      break;
  }
  return true;
}

// Avança para a próxima etapa ou envia os dados se for a última etapa
function nextStep() {
  if (currentStep === steps.length - 1) {
    sendData();
    return;
  }
  if (!validateCurrentStep()) return;
  currentStep++;
  showStep(currentStep);
}

// Volta para a etapa anterior
function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Coleta os dados, formata a mensagem e direciona para o WhatsApp
function sendData() {
  if (!validateCurrentStep()) return;
  const email = document.getElementById('email').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const specialty = document.getElementById('specialty').value;
  const role = document.getElementById('role').value;
  const billing = document.getElementById('billing').value;
  const fullName = firstName + " " + lastName;

  let message = "Quero mudar agora!\n";
  message += "Nome: " + fullName + "\n";
  message += "E-mail: " + email + "\n";
  message += "Telefone: " + phone + "\n";
  message += "Especialidade: " + specialty + "\n";
  message += "Função: " + role + "\n";
  message += "Faturamento: " + billing;

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "5513996136266"; // Número informado
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.location.href = whatsappURL;
}

// Ouvinte de clique para os botões dentro do container
document.querySelector('.container').addEventListener('click', function(event) {
  if (event.target.classList.contains('next-button')) {
    nextStep();
  }
  if (event.target.classList.contains('prev-button')) {
    prevStep();
  }
});
