// Initialize EmailJS with your public key
emailjs.init("OCfSGxMwxQufWjlFh"); // Replace this with your actual public key from EmailJS dashboard

const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

btnNo.addEventListener("mouseover", (event) => {
    const containerHeight = container.getBoundingClientRect().height;
    const containerWidth = container.getBoundingClientRect().width;
    const btnHeight = btnNo.getBoundingClientRect().height;
    const btnWidth = btnNo.getBoundingClientRect().width;
    const btnTop = btnNo.getBoundingClientRect().top;
    const btnLeft = btnNo.getBoundingClientRect().left;
    let newTop = btnTop;
    let newLeft = btnLeft;
    while (Math.abs(newTop - btnTop) < containerHeight / 3) {
        newTop = getRandomNumber(0, containerHeight - btnHeight);
    }
    while (Math.abs(newLeft - btnLeft) < containerWidth / 3) {
        newLeft = getRandomNumber(0, containerWidth - btnWidth);
    }
    btnNo.style.top = Math.floor(newTop) + "px";
    btnNo.style.left = Math.floor(newLeft) + "px";
});

btnYes.addEventListener("click", async (e) => {
    // Disable button during sending
    btnYes.disabled = true;
    btnYes.textContent = "Sending...";

    // Original functionality
    btnNo.classList.add("hide");
    imageOne.classList.add("hide");
    imageTwo.classList.remove("hide");

    // Email parameters
    const templateParams = {
        to_name: "Your Name", // Replace with recipient's name
        message: "Someone said YES to your date request! 🎉",
        date: new Date().toLocaleString()
    };

    try {
        const response = await emailjs.send(
            "service_dn7eh0x",    // Replace with your actual service ID
            "template_a7432u8",   // Replace with your actual template ID
            templateParams
        );
        console.log("SUCCESS!", response.status, response.text);
        btnYes.textContent = "Sent! ❤️";
    } catch (error) {
        console.error("FAILED...", error);
        btnYes.textContent = "Error! Try again";
        btnYes.disabled = false;
    }
});