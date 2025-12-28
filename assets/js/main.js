/* --- 1. LÓGICA DAS ABAS (PERFIS) --- */
function openTab(evt, tabName) {
    var i, tabContent, tabBtn;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active");
    }
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].className = tabBtn[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

/* --- 2. TIMELINE DINÂMICA (COMO FUNCIONA) --- */
const stepsData = {
    1: "<h4>1. Cadastre-se</h4><p>Preencha seus dados e escolha seu perfil. É rápido e 100% gratuito para profissionais.</p>",
    2: "<h4>2. Validação</h4><p>Nossa equipe valida suas informações para garantir a segurança da comunidade.</p>",
    3: "<h4>3. Receba Ofertas</h4><p>Conecte-se com oportunidades reais ou profissionais qualificados na sua região.</p>",
    4: "<h4>4. Operação Segura</h4><p>Combine detalhes via chat integrado e realize o serviço com monitoramento.</p>",
    5: "<h4>5. Avaliação</h4><p>Finalize o serviço e avalie. Construa sua reputação no ecossistema Loomper.</p>"
};

function setStep(stepNum) {
    document.getElementById('step-content').innerHTML = stepsData[stepNum];
    let dots = document.getElementsByClassName('step-dot');
    for(let d of dots) d.classList.remove('active');
    dots[stepNum-1].classList.add('active');
}
// Iniciar no passo 1
setStep(1);

/* --- 3. AUTO-FECHAMENTO ACCORDION --- */
const details = document.querySelectorAll("details");
details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail !== targetDetail) {
                detail.removeAttribute("open");
            }
        });
    });
});

/* --- 4. FORMULÁRIO INTELIGENTE --- */
// a) Detectar Convite na URL (?convite=CODIGO)
const urlParams = new URLSearchParams(window.location.search);
const conviteCode = urlParams.get('convite');
if(conviteCode) {
    document.getElementById('codigoIndicacao').value = conviteCode;
}

// b) Mudar Botão de Acordo com Perfil
function updateFormCTA() {
    const perfil = document.getElementById('perfilSelect').value;
    const btn = document.getElementById('submitBtn');
    
    const perfilEmpresa = ['Montadora', 'Seguradora', 'Governo/Órgão Público', 'Investidor'];
    
    if (perfilEmpresa.includes(perfil)) {
        btn.textContent = "SOLICITAR DEMONSTRAÇÃO";
    } else {
        btn.textContent = "QUERO SER PIONEIRO";
    }
}

// c) Função para pré-selecionar perfil vindo do Accordion
function selectRole(role) {
    const select = document.getElementById('perfilSelect');
    select.value = role;
    updateFormCTA();
}

/* --- 5. COPIAR PIX (APOIE) --- */
function copyPix(valor) {
    // Chave PIX oficial
    const pixKey = "contato@loomper.com.br"; 
    
    navigator.clipboard.writeText(pixKey).then(() => {
        // Feedback Visual
        const feedback = document.getElementById('pix-feedback');
        feedback.classList.remove('hidden');
        feedback.style.display = 'block';
        
        // Esconder feedback após 5s
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 6000);
    });
}

/* --- 6. API IBGE (ESTADOS E CIDADES) --- */
// Carregar Estados
fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(res => res.json())
    .then(estados => {
        const selectUF = document.getElementById('estadoSelect');
        estados.forEach(uf => {
            const option = document.createElement('option');
            option.value = uf.sigla;
            option.textContent = uf.sigla;
            selectUF.appendChild(option);
        });
    });

// Carregar Cidades ao selecionar Estado
document.getElementById('estadoSelect').addEventListener('change', function() {
    const uf = this.value;
    if(!uf) return;
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => res.json())
        .then(cidades => {
            const dataList = document.getElementById('cidadesList');
            dataList.innerHTML = ''; // Limpar
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.nome;
                dataList.appendChild(option);
            });
        });
});

/* --- 7. MÁSCARA WHATSAPP (+55 FIXO) --- */
document.getElementById('whatsappInput').addEventListener('input', function (e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});
