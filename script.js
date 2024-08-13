// Mock databases
let artists = [];
let artworks = [];

// Register Artist
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const artist = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        artworks: 0
    };
    artists.push(artist);

    displayArtists();

    alert('Artist registered successfully!');
    this.reset();
});

// Upload Artwork
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const artistName = document.getElementById('artist').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = title;
        imgElement.addEventListener('click', () => openModal(title, artistName, category, e.target.result));

        const artwork = {
            title,
            category,
            artist: artistName,
            imgElement
        };
        artworks.push(artwork);

        // Increase artwork count for the artist
        const artist = artists.find(a => a.name === artistName);
        if (artist) artist.artworks += 1;

        const artworkGrid = document.getElementById('artworkGrid');
        artworkGrid.appendChild(imgElement);

        // Add category to filter dropdown if new
        const filterCategory = document.getElementById('filterCategory');
        if (![...filterCategory.options].some(option => option.value === category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        }

        displayArtists();
    };
    reader.readAsDataURL(image);

    this.reset();
    alert('Artwork uploaded successfully!');
});

// Filter Artworks by Category
document.getElementById('filterCategory').addEventListener('change', function(event) {
    const selectedCategory = event.target.value;
    const artworkGrid = document.getElementById('artworkGrid');
    artworkGrid.innerHTML = ''; // Clear the grid

    const filteredArtworks = selectedCategory === 'all' ? artworks : artworks.filter(art => art.category === selectedCategory);

    filteredArtworks.forEach(art => {
        artworkGrid.appendChild(art.imgElement);
    });
});

// Display Artists
function displayArtists() {
    const artistList = document.getElementById('artistList');
    artistList.innerHTML = ''; // Clear the list

    artists.forEach(artist => {
        const artistDiv = document.createElement('div');
        artistDiv.textContent = `${artist.name} (${artist.artworks} artworks)`;

        const artistLink = document.createElement('a');
        artistLink.href = '#gallery';
        artistLink.textContent = `View ${artist.name}'s Artworks`;
        artistLink.addEventListener('click', function() {
            filterArtworksByArtist(artist.name);
        });

        artistDiv.appendChild(artistLink);
        artistList.appendChild(artistDiv);
    });
}

// Filter Artworks by Artist
function filterArtworksByArtist(artistName) {
    const artworkGrid = document.getElementById('artworkGrid');
    artworkGrid.innerHTML = ''; // Clear the grid

    const filteredArtworks = artworks.filter(art => art.artist === artistName);

    filteredArtworks.forEach(art => {
        artworkGrid.appendChild(art.imgElement);
    });
}

// Open Modal with Artwork Details
function openModal(title, artist, category, imgSrc) {
    const modal = document.getElementById('artworkModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalArtist').textContent = artist;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalImage').src = imgSrc;
    modal.style.display = "block";
}

// Close Modal
document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('artworkModal');
    modal.style.display = "none";
});

// Close Modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('artworkModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Basic Virtual Tour Interaction
document.getElementById('tourImage').addEventListener('click', function() {
    alert('Entering the virtual tour... (This is a placeholder for actual 360-degree interaction)');
});
