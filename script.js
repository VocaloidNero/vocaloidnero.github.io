// script.js
document.getElementById("generateButton").addEventListener("click", function () {
    const templateImage = document.getElementById("templateImage").files[0];
    const inputText = document.getElementById("inputText").value;
    const loading = document.getElementById("loading");
    const outputImage = document.getElementById("outputImage");
  
    if (!templateImage || !inputText) {
      alert("Please upload a handwriting template and enter some text!");
      return;
    }
  
    // Show loading message
    loading.classList.remove("hidden");
  
    // Simulate API call to model (Replace this with actual API logic)
    setTimeout(() => {
      loading.classList.add("hidden");
      outputImage.src = "path/to/generated/image.png"; // Replace with actual model output
    }, 2000);
  });

  document.getElementById("generateButton").addEventListener("click", async function () {
    const templateImage = document.getElementById("templateImage").files[0];
    const inputText = document.getElementById("inputText").value;
    const loading = document.getElementById("loading");
    const outputImage = document.getElementById("outputImage");
  
    if (!templateImage || !inputText) {
      alert("Please upload a handwriting template and enter some text!");
      return;
    }
  
    // 显示加载动画
    loading.classList.remove("hidden");
  
    // 创建表单数据
    const formData = new FormData();
    formData.append("template", templateImage);
    formData.append("text", inputText);
  
    try {
      // 调用后端API
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // 显示生成的图片
        loading.classList.add("hidden");
        outputImage.src = result.output; // 需要确保后端返回的路径可直接访问
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      loading.classList.add("hidden");
      alert(`Error: ${error.message}`);
    }
  });