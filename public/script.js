document
    .getElementById("messageForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        var message = document.getElementById("messageInput").value.trim();
        if (message) {
            fetch("/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: message }),
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    loadMessages(); // 메시지 다시 불러오기
                });

            document.getElementById("messageInput").value = ""; // 입력 필드 초기화
        }
    });

function loadMessages() {
    fetch("/messages")
        .then((response) => response.json())
        .then((messages) => {
            var messagesContainer = document.getElementById("messages");
            messagesContainer.innerHTML = ""; // 컨테이너 초기화
            messages.forEach((msg) => {
                var messageElement = document.createElement("p");
                messageElement.textContent = msg.content;
                messagesContainer.appendChild(messageElement);
            });
        });
}

// 페이지 로드 시 메시지 불러오기
document.addEventListener("DOMContentLoaded", function () {
    loadMessages();
});
