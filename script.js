// Mock databases
let artists = [];
let artworks = [];
let currentPage = 1;
const itemsPerPage = 6; 

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
        imgElement.loading = "lazy"; // Enable lazy loading
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

        // Add category to filter dropdown if new
        const filterCategory = document.getElementById('filterCategory');
        if (![...filterCategory.options].some(option => option.value === category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        }

        displayArtists();
        displayArtworks(); 
    };
    reader.readAsDataURL(image);

    this.reset();
    alert('Artwork uploaded successfully!');
});

// Filter Artworks by Category
document.getElementById('filterCategory').addEventListener('change', function(event) {
    displayArtworks();
});


function displayArtworks() {
    const selectedCategory = document.getElementById('filterCategory').value;
    const artworkGrid = document.getElementById('artworkGrid');
    artworkGrid.innerHTML = ''; // Clear the grid

    const filteredArtworks = selectedCategory === 'all' ? artworks : artworks.filter(art => art.category === selectedCategory);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const artworksToDisplay = filteredArtworks.slice(startIndex, endIndex);

    artworksToDisplay.forEach(art => {
        artworkGrid.appendChild(art.imgElement);
    });

    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = endIndex >= filteredArtworks.length;
}


document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        displayArtworks();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    currentPage++;
    displayArtworks();
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

// Search Artworks and Artists
document.getElementById('searchBar').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const artworkGrid = document.getElementById('artworkGrid');
    artworkGrid.innerHTML = ''; // Clear the grid

    const filteredArtworks = artworks.filter(art => 
        art.title.toLowerCase().includes(query) || 
        art.artist.toLowerCase().includes(query)
    );

    filteredArtworks.forEach(art => {
        artworkGrid.appendChild(art.imgElement);
    });
});

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

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Initial Display
displayArtworks();
displayArtists();
