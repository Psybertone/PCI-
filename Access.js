document.addEventListener("DOMContentLoaded", function () {
    function validateAccess() {
        let userID = document.getElementById("psybercorp-id").value.trim();
        let accessCode = document.getElementById("access-code").value.trim();
        let errorMsg = document.getElementById("error-message");
        let successMsg = document.getElementById("success-message");
        let accessLink = document.getElementById("access-link");
        let clueURL = document.getElementById("clue-url");

        // Clear previous messages
        errorMsg.style.display = "none";
        successMsg.style.display = "none";
        accessLink.style.display = "none";

        if (!userID || !accessCode) {
            errorMsg.innerText = "Please enter both User ID and Access Code.";
            errorMsg.style.display = "block";
            return;
        }

        let data = { id: userID, code: accessCode };

        fetch("https://script.google.com/macros/s/AKfycbzAKkyXFX6zFQem2BXzrwSjdLPeYH1mr5_Saf6-F5OSk_cwVz3_jfyMqAm9j0S99iLT5g/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            mode: "cors",
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(result => {
            console.log("Server response:", result);

            if (result.status === "success") {
                successMsg.innerText = "✅ Access Granted!";
                successMsg.style.display = "block";

                // Show clue URL button
                clueURL.href = result.clueURL;
                accessLink.style.display = "block";

            } else {
                errorMsg.innerText = result.message;
                errorMsg.style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMsg.innerText = "⚠️ Network error. Try again later.";
            errorMsg.style.display = "block";
        });
    }

    // Attach function to button click
    document.querySelector(".submit-btn").addEventListener("click", validateAccess);
});
