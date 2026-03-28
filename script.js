async function uploadFile() {
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

const data = JSON.parse(text);
  
  const data = await res.json();
  document.getElementById("output").innerText = data.result;
}
