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

    // ✅ Check if response is OK
    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    // ✅ Ensure it's JSON
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON response:", text);
      throw new Error("Server did not return JSON");
    }

    const data = await res.json();

    // ✅ Handle backend error
    if (data.error) {
      throw new Error(data.error);
    }

    // ✅ Show result
    document.getElementById("output").innerText =
      data.result ||
      JSON.stringify(data, null, 2);

  } catch (err) {
    console.error("ERROR:", err);
    alert(err.message);
  }
};
