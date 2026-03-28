async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("YOUR_BACKEND_URL/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.result;
}