document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Artist registered successfully!');
    this.reset();
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = title;

        const artworkGrid = document.getElementById('artworkGrid');
        artworkGrid.appendChild(imgElement);
    };
    reader.readAsDataURL(image);

    this.reset();
    alert('Artwork uploaded successfully!');
});
