const imageChoiceBtn = document.getElementById("imageChoiceBtn");
const difficultyBtn = document.getElementById("difficultyBtn");
const imgDropdown = document.querySelector(".img-cont");
const diffDropdown = document.querySelector(".diff-cont");

// Function to toggle visibility of dropdown
function toggleDropdown(dropdown) {
  dropdown.classList.toggle("hide");
}

// Add click events for buttons
imageChoiceBtn.addEventListener("click", () => {
  toggleDropdown(imgDropdown);
  imgDropdown.classList.toggle("show");
  diffDropdown.classList.add("hide"); 
});
// Close the other dropdown if open


difficultyBtn.addEventListener("click", () => {
    console.log("clicked");
    toggleDropdown(diffDropdown);
    imgDropdown.classList.add("hide"); 
    imgDropdown.classList.remove("show");
});
// Close the other dropdown if open

