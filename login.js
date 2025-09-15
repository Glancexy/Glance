// Funções de login modularizadas
function validarLogin(email, senha) {
    return email.trim() && senha.trim() && email.endsWith('@gmail.com');
}

function setupLoginForm() {
    var loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = function(e) {
            var form = loginBtn.closest('.page');
            var email = form.querySelector('input[type="email"]');
            var senha = form.querySelector('input[type="password"]');
            if (!validarLogin(email.value, senha.value)) {
                e.preventDefault();
                if (typeof showMessageBox === 'function') {
                    showMessageBox('Preencha todos os campos corretamente para entrar!\nO e-mail deve terminar com @gmail.com');
                } else {
                    alert('Preencha todos os campos corretamente para entrar!\nO e-mail deve terminar com @gmail.com');
                }
                return false;
            }
            showPage('feed');
        };
    }
}

export { setupLoginForm };
