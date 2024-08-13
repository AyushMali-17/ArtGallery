ocument.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Artist registered successfully!');
    this.reset();
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').files[0];
}