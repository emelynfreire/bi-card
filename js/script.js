// Função para fechar o alerta
function fecharAlerta() {
    const alertBox = document.getElementById("alert-box");
    alertBox.style.display = "none";
}

// Exibe o alerta quando a página é carregada
window.onload = function() {
    const alertBox = document.getElementById("alert-box");
    alertBox.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const infoForm = document.getElementById("info-form");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const startQuizButton = document.getElementById("start-quiz");
    const submitQuizButton = document.getElementById("submit-quiz");
    const photoInput = document.getElementById("photo");
    const uploadedPhoto = document.getElementById("uploaded-photo");
    const refreshPageButton = document.getElementById("refresh-page");

    startQuizButton.addEventListener("click", function () {
        infoForm.style.display = "none";
        quizContainer.style.display = "block";
    });

    photoInput.addEventListener("change", function () {
        const file = photoInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                uploadedPhoto.src = e.target.result;
                uploadedPhoto.style.display = "block";
            };

            reader.readAsDataURL(file);
        }
    });

    submitQuizButton.addEventListener("click", function () {
        const q1Answer = parseInt(document.getElementById("q1").value);
        const q2Answer = parseInt(document.getElementById("q2").value);
        let retorno_Situacao;
        let msg_Situacao;

        // Verifique se as condições da carteirinha são atendidas
        if ((q1Answer === q2Answer) && q1Answer > 0 && q2Answer > 0) {
            retorno_Situacao = "ATIVA!"
            msg_Situacao = "Parabéns você está em dia com sua carteirinha!";
        } else if (q1Answer === 0 && q2Answer === 0) {
            retorno_Situacao = "ATIVA!!"
            msg_Situacao = "Porém, a um passo de ser confiscada! Fique com alguém ou vá na terapia.";
        } else if ((q1Answer < q2Answer && q1Answer === 0) || (q1Answer > q2Answer && q2Answer === 0)) {
            retorno_Situacao = "CONFISCADA!";
            msg_Situacao = "Cancelada por ser bi-festinha.";
        }
        else if (q1Answer > q2Answer) {
            retorno_Situacao = "CONFISCADA!";
            msg_Situacao = "Cancelada por ficar com mais molieres que machos.";
        } else if (q1Answer < q2Answer) {
            retorno_Situacao = "CONFISCADA!";
            msg_Situacao = "Cancelada por ficar com mais machos que molieres.";
        } else {
            retorno_Situacao = "No ármario...."
            msg_Situacao = "o que tá acontecendo meu anjo?!";
        }

        document.getElementById("nome").textContent = document.getElementById("name").value;
        document.getElementById("idade").textContent = document.getElementById("age").value;
        document.getElementById("cidade-pais").textContent = document.getElementById("location").value;
        document.getElementById("situacao").textContent = retorno_Situacao;
        document.getElementById("msgsituacao").textContent = msg_Situacao;

        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        // Exibe a foto no resultado, se uma foto foi carregada
        const resultPhoto = document.getElementById("result-photo");
        resultPhoto.src = uploadedPhoto.src;
        resultPhoto.style.display = "block";

    });

    refreshPageButton.addEventListener("click", function () {
        // Recarrega a página quando o botão "Atualizar Página" é clicado
        location.reload();
    });

    document.getElementById('download-btn').addEventListener('click', function () {
        html2canvas(document.querySelector(".carteirinha")).then(canvas => {
            let imageData = canvas.toDataURL("image/png");
            let link = document.createElement('a');
            link.href = imageData;
            link.download = "minhaCarteirinha.png";
            link.click();
        });
    });
});
