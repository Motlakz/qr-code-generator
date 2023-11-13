document.addEventListener("DOMContentLoaded", function () {
    const formSection = document.querySelector(".form");
    const generatedCodeSection = document.querySelector(".generated-code");
    const inputUrl = document.getElementById("input-url");
    const qrImage = document.getElementById("qr-image");
    const shareButton = document.querySelector('.share');
    const downloadButton = document.querySelector('.download');

    document.querySelector(".generate").addEventListener("click", function (event) {
        event.preventDefault();

        // Validate URL before generating QR code
        if (isValidURL(inputUrl.value)) {
            const apiUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputUrl.value)}`;
            
            // Set the src attribute of the qrImage to the API URL
            qrImage.src = apiUrl;

            // Toggle visibility of sections
            formSection.style.display = "none";
            generatedCodeSection.style.display = "block";

            // re-add changes made to the image since it disappears when the image is generated
            qrImage.style.display = "block";
            qrImage.style.position = "relative";
            qrImage.style.top = "40px";
            qrImage.style.left = "40px";

        } else {
            alert("Please enter a valid URL.");
        }
    });

    shareButton.addEventListener("click", function () {
        // Copy QR code URL to clipboard
        const tempInput = document.createElement("input");
        tempInput.value = qrImage.src;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        alert("QR code URL copied to clipboard!");
    });

    downloadButton.addEventListener("click", function () {
        // Create a download link for the QR code image
        const downloadLink = document.createElement("a");
        downloadLink.href = qrImage.src;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    function isValidURL(url) {
        // Basic URL validation (you can enhance it based on your requirements)
        const urlPattern = /^(http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    }
});
