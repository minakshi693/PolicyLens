window.uploadFile = async function () {
  try {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://policylens-n29k.onrender.com/analyze", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    document.getElementById("output").innerText = data.result;

  } catch (err) {
    console.error(err);
    alert("Error occurred");
  }
};async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://policylens-n29k.onrender.com", {
    method: "POST",
    body: formData,
  });
const text = await res.text();
console.log("RAW RESPONSE:", text);

const parsedData = JSON.parse(text); // ✅ new name

document.getElementById("output").innerText = parsedData.result;
}
