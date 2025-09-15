// auth.js - Responsável por cadastro, login e validação

// Validação do cadastro: só permite criar conta se e-mail for válido e senha >= 6 caracteres
document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signup-form');
    var signupBtn = document.getElementById('signup-btn');
    if (signupForm && signupBtn) {
        function checkFields() {
            var email = signupForm.querySelector('[name="email"]').value.trim();
            var senha = signupForm.querySelector('[name="senha"]').value.trim();
            var emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            var validEmail = emailRegex.test(email);
            var validSenha = senha.length >= 6;
            signupBtn.disabled = (!validEmail || !validSenha);
            signupBtn.classList.toggle('opacity-50', signupBtn.disabled);
            signupBtn.classList.toggle('cursor-not-allowed', signupBtn.disabled);
        }
        signupForm.querySelector('[name="email"]').addEventListener('input', checkFields);
        signupForm.querySelector('[name="senha"]').addEventListener('input', checkFields);
        checkFields();
    }
});

function attachLoginSignupValidation() {
    // Login
    var loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = null;
        loginBtn.onclick = function(e) {
            var form = loginBtn.closest('.page');
            var email = form.querySelector('input[type="email"]');
            var senha = form.querySelector('input[type="password"]');
            if (!email.value.trim() || !senha.value.trim()) {
                e.preventDefault();
                if (typeof showMessageBox === 'function') {
                    showMessageBox('Preencha todos os campos para entrar!');
                } else {
                    alert('Preencha todos os campos para entrar!');
                }
                return false;
            }
            if (!email.value.trim().endsWith('@gmail.com')) {
                e.preventDefault();
                if (typeof showMessageBox === 'function') {
                    showMessageBox('O e-mail deve terminar com @gmail.com');
                } else {
                    alert('O e-mail deve terminar com @gmail.com');
                }
                return false;
            }
            showPage('feed');
        };
    }
    // Cadastro
    var signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.onsubmit = function(e) {
            e.preventDefault();
            var inputs = signupForm.querySelectorAll('input');
            var emailInput = signupForm.querySelector('[name="email"]');
            var senhaInput = signupForm.querySelector('[name="senha"]');
            var email = emailInput ? emailInput.value.trim() : '';
            var senha = senhaInput ? senhaInput.value.trim() : '';
            var emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            if (!email || !senha || !emailRegex.test(email) || senha.length < 6) {
                // Não envia, sem alertas
                return false;
            }
            // Firebase Auth: cria conta
            if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
                firebase.auth().createUserWithEmailAndPassword(email, senha)
                    .then(function(userCredential) {
                        // Usuário criado com sucesso
                        var user = userCredential.user;
                        // Salva dados básicos no Firestore e só então avança
                        firebase.firestore().collection('users').doc(user.uid).set({
                            email: user.email,
                            criadoEm: new Date()
                        }).then(function() {
                            // Depois de cadastrar, vai pro onboarding em vez de ir direto pro feed
                            showPage('onboarding');
                        }).catch(function(err) {
                            alert('Conta criada, mas erro ao salvar dados: ' + err.message);
                        });
                    })
                    .catch(function(error) {
                        if (error.code === 'auth/email-already-in-use') {
                            alert('Este e-mail já está em uso. Use outro ou faça login.');
                        } else {
                            alert('Erro ao cadastrar: ' + error.message);
                        }
                        // Não faz mais nada!
                    });
                return false;
            }
            return false;
        };
    }
}
document.addEventListener('DOMContentLoaded', attachLoginSignupValidation);
// Re-attach validation every time a page is shown
if (window.showPage) {
    const oldShowPage = window.showPage;
    window.showPage = function(page) {
        if (oldShowPage) oldShowPage.apply(this, arguments);
        setTimeout(attachLoginSignupValidation, 50);
    };
}
