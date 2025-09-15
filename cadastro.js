// Funções de cadastro modularizadas
function validarCadastro(email, senha) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email) && senha.length >= 6;
//

function cadastrarUsuario(email, senha, onSuccess, onError) {
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(function(userCredential) {
                var user = userCredential.user;
                firebase.firestore().collection('users').doc(user.uid).set({
                    email: user.email,
                    criadoEm: new Date()
                }).then(function() {
                    if (onSuccess) onSuccess();
                }).catch(function(err) {
                    if (onError) onError('Conta criada, mas erro ao salvar dados: ' + err.message);
                });
            })
            .catch(function(error) {
                if (onError) {
                    if (error.code === 'auth/email-already-in-use') {
                        onError('Este e-mail já está em uso. Use outro ou faça login.');
                    } else {
                        onError('Erro ao cadastrar: ' + error.message);
                    }
                }
            });
    }
}

function setupCadastroForm() {
    var signupForm = document.getElementById('signup-form');
    var signupBtn = document.getElementById('signup-btn');
    if (signupForm && signupBtn) {
        function checkFields() {
            var email = signupForm.querySelector('[name="email"]').value.trim();
            var senha = signupForm.querySelector('[name="senha"]').value.trim();
            signupBtn.disabled = !validarCadastro(email, senha);
            signupBtn.classList.toggle('opacity-50', signupBtn.disabled);
            signupBtn.classList.toggle('cursor-not-allowed', signupBtn.disabled);
        }
        signupForm.querySelector('[name="email"]').addEventListener('input', checkFields);
        signupForm.querySelector('[name="senha"]').addEventListener('input', checkFields);
        checkFields();
        signupForm.onsubmit = function(e) {
            e.preventDefault();
            var email = signupForm.querySelector('[name="email"]').value.trim();
            var senha = signupForm.querySelector('[name="senha"]').value.trim();
            if (!validarCadastro(email, senha)) return false;
            // Mostra o modal imediatamente
            mostrarModalCadastroSucesso();
            cadastrarUsuario(email, senha, function() {
                // Nada, já mostrou o modal
            }, function(msg) {
                alert(msg);
            });
            return false;
        };
    }
}

// Função para mostrar modal de sucesso e redirecionar para login
function mostrarModalCadastroSucesso() {
    // Cria modal se não existir
    let modal = document.getElementById('modal-cadastro-sucesso');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-cadastro-sucesso';
        modal.innerHTML = `
            <div style="position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;">
                <div style="background:white;padding:2.5rem 2rem;border-radius:1.5rem;box-shadow:0 8px 32px 0 rgba(31,38,135,0.10);max-width:90vw;min-width:220px;text-align:center;">
                    <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem;color:#111">Cadastro concluído com sucesso!</h2>
                    <p style="font-size:1rem;color:#333;margin-bottom:2rem;">Faça login na sua conta para começar a usar.</p>
                    <button id="btn-modal-cadastro-entendido" style="padding:0.75rem 2.5rem;background:#2563eb;color:white;font-weight:600;border:none;border-radius:1rem;font-size:1rem;cursor:pointer;">Entendido</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }
    // Remove qualquer tela de onboarding e oculta todas as páginas, overlays e modais, exceto o modal de boas-vindas
    document.querySelectorAll('.page, [data-page], .modal, .overlay').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    // Remove qualquer tentativa de reabrir páginas até o usuário clicar em Entendido
    if (window.showPage) {
        window._showPageBackup = window.showPage;
        window.showPage = function(){};
    }
    // Mostra apenas o modal
    modal.style.display = 'flex';
    // Evento do botão
    const btn = document.getElementById('btn-modal-cadastro-entendido');
    if (btn) {
        btn.onclick = function() {
            modal.style.display = 'none';
            // Restaura showPage
            if (window._showPageBackup) window.showPage = window._showPageBackup;
            if (typeof showPage === 'function') showPage('login_form');
        };
    }
    }
}

export { setupCadastroForm };
