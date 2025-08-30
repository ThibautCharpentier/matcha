import pandas as pd
import random
from faker import Faker

fake = Faker('fr_FR')

# Tags possibles
possible_tags = [
    "Cinéma", "Musique", "Harry Potter", "Heavy Metal", "Fêtes", "Gym", "Yoga", "Gastronomie",
    "Gastronomie japonaise", "Hockey", "Tennis de table", "Tennis", "Badminton", "Football",
    "Basket-ball", "Sport", "Théâtre", "Aquarium", "Zoo", "Parc", "Réseaux sociaux", "Voyage",
    "Guitariste", "Pianiste", "Saxophoniste", "Hip-hop", "Cosmétiques", "J-Pop", "K-Pop", "Pop", "Rap",
    "Freelance", "Skateboard", "Cyclisme", "Automobile", "Photographie", "Lecture", "Chant", "Stand up",
    "Jeux vidéo", "League of Legends", "The Legend of Zelda", "Super Mario", "Valorant", "Jeux en ligne",
    "Jeux mobile", "Clash of Clans", "Clash Royal", "Plongée", "Natation", "Sport de combat", "Boxe",
    "Judo", "Karaté", "Animaux", "Chien", "Chat", "Escape games", "Shopping", "Restaurant", "Brunch",
    "Cuisine", "Ski", "Surf", "Snowboard", "Sport d'été", "Sport d'hiver", "Hiver", "Eté", "Road trips",
    "Patinoire", "Canoë", "Kayak", "PlayStation", "Nintendo", "Youtube", "Twitch", "Cosplay", "E-sport",
    "Création de contenus", "Influenceur", "Streamer", "Peinture", "Paddle", "Bowling", "Electro",
    "Drum and Bass", "Synthwave", "Dubstep", "Equitation", "Ecologie", "Escrime", "Science-fiction",
    "Jardinage", "Art", "Politique", "Musée", "BBQ", "Vegan", "Gamer", "Geek", "Piercing", "Tatouage",
    "Escalade", "Rock", "Dessin", "One Piece", "Hunter x Hunter", "Bleach", "Jojo's Bizarre Adventure",
    "Jujutsu Kaisen", "Attack on Titans", "Fullmetal Alchemist", "Bénévolat", "Jeux de société",
    "Jeux de rôles", "Donjons et Dragons", "Vlogs", "Ramen", "Sushi", "Gastronomie asiatique",
    "Gastronomie française", "Gastronomie corréenne", "Gastronomie chinoise", "Concert", "Littérature",
    "Philosophie", "Mathématiques", "Physique", "Chimie", "Histoire", "Sciences", "Géographie",
    "Anglais", "Français", "Allemand", "Espagnol", "Italien", "Chinois", "Japonais", "Corréen", "Arabe",
    "Langues étrangères", "Manga", "Marathon", "Maquillage", "Arts Martiaux", "LGBT", "Féminisme",
    "Humanisme", "Fantaisie", "Fantastique", "Comédie", "Films dramatique", "Volleyball", "Handball",
    "Technologie", "Réalité Virtuelle", "Dofus", "World of Warcraft", "From Software", "Naughty Dog",
    "Rockstar", "Casino", "Collectionneur", "Poker", "Jeux de cartes", "Danse", "Baseball", "Parkour",
    "Vie nocturne", "Fast-food", "Mèmes", "Métavers", "Instrument de musique", "Randonnée", "Montagnes",
    "Plage", "Piscine", "Tir à l'arc", "Netflix and chill", "Introverti", "Extraverti", "Plaid",
    "Breaking Bad", "Game of Thrones", "Séries télévisées", "Séries policières", "Séries dramatique",
    "Squid Game", "K-Drama", "Hollywood", "Cinéma français", "Cinéma Américain", "Cinéma corréen",
    "Cinéma japonais", "Street food", "Pâtisserie", "Camping", "Bubble-tea", "Coca-cola", "Ice tea",
    "Anime", "Athlétisme", "Bricolage", "Campagne", "Ville", "Internet", "Nature", "Disney",
    "Studio Ghibli", "Marvel", "DC Comics", "Films d'horreur", "Fitness", "Bars", "Belote", "Tarot",
    "Films d'action", "Rugby", "Paranormal", "Storytelling", "Peaky Blinders", "Disco", "Outer Wilds"
]

# Bios possibles
bios = [
    "Adventure seeker.",
    "Lover of new experiences.",
    "Always eager to learn.",
    "Nature enthusiast.",
    "Culture explorer.",
    "Optimistic and curious.",
    "Music and movie fan.",
    "Born athlete.",
    "Bookworm and traveler.",
    "Creative and determined.",
    "Foodie at heart.",
    "Friendly and kind.",
    "Passionate and curious.",
    "Always up for adventure.",
    "Tech and innovation lover.",
    "Dreamer with a plan.",
    "Wellness and yoga fan.",
    "Social and open-minded.",
    "Art lover in every form.",
    "Forever a student.",
    "Coffee lover.",
    "Chasing dreams daily.",
    "Ocean admirer.",
    "City wanderer.",
    "Fitness enthusiast.",
    "Dog lover.",
    "Cat person.",
    "Nature walker.",
    "Storyteller at heart.",
    "Music is life.",
    "Movie buff.",
    "Laughter is medicine.",
    "Positive vibes only.",
    "Always learning new things.",
    "Traveler’s soul.",
    "Good food, good mood.",
    "Sunset chaser.",
    "Creative mind.",
    "Collector of memories.",
    "Peace seeker.",
    "Mindful and present.",
    "Family first.",
    "Book lover.",
    "Coffee and books.",
    "Dream big, work hard.",
    "Kindness matters.",
    "Life is beautiful.",
    "Believe in magic.",
    "Smiles for miles."
]

# Liste de villes avec coordonnées fictives
cities_coords = [
    ("Paris", 48.8566, 2.3522),
    ("Lyon", 45.7640, 4.8357),
    ("Marseille", 43.2965, 5.3698),
    ("Toulouse", 43.6047, 1.4442),
    ("Nice", 43.7102, 7.2620),
    ("Nantes", 47.2184, -1.5536),
    ("Strasbourg", 48.5734, 7.7521),
    ("Montpellier", 43.6119, 3.8777),
    ("Bordeaux", 44.8378, -0.5792),
    ("Lille", 50.6292, 3.0573),
    ("Rennes", 48.1173, -1.6778),
    ("Reims", 49.2583, 4.0317),
    ("Le Havre", 49.4944, 0.1079),
    ("Saint-Étienne", 45.4397, 4.3872),
    ("Toulon", 43.1242, 5.9280),
    ("Grenoble", 45.1885, 5.7245),
    ("Dijon", 47.3220, 5.0415),
    ("Angers", 47.4784, -0.5632),
    ("Nîmes", 43.8367, 4.3601),
    ("Villeurbanne", 45.7660, 4.8799),
    ("Clermont-Ferrand", 45.7772, 3.0870),
    ("Le Mans", 48.0061, 0.1996),
    ("Aix-en-Provence", 43.5297, 5.4474),
    ("Brest", 48.3904, -4.4861),
    ("Limoges", 45.8336, 1.2611),
    ("Tours", 47.3941, 0.6848),
    ("Amiens", 49.8950, 2.3023),
    ("Metz", 49.1193, 6.1757),
    ("Perpignan", 42.6887, 2.8948),
    ("Besançon", 47.2378, 6.0241),
    ("Orléans", 47.9025, 1.9090),
    ("Caen", 49.1829, -0.3707),
    ("Pau", 43.2951, -0.3708),
    ("La Rochelle", 46.1603, -1.1511),
    ("Saint-Denis", 48.9362, 2.3574)
]


users = []

for i in range(1, 501):
    gender = "woman" if i <= 250 else "man"
    firstname = fake.first_name_female() if gender == "woman" else fake.first_name_male()
    lastname = fake.last_name()
    username = f"User{i}"
    picture_profile = f"uploads/{username}/picture-profile.png"
    pictures = f"{{uploads/{username}/pictures-1.png,uploads/{username}/pictures-2.png,uploads/{username}/pictures-3.png}}"
    email = f"{username}@example.com"
    password = "password1000"
    preferences = random.choice(["men", "women", "bi"])
    bio = random.choice(bios)
    birthdate = fake.date_of_birth(minimum_age=18, maximum_age=95).strftime("%Y-%m-%d")
    city, lat, lon = random.choice(cities_coords)
    tags = ",".join(random.sample(possible_tags, k=random.randint(3, 8)))

    users.append({
        "id": i * 1000,
        "username": username,
        "picture_profile": picture_profile,
        "pictures": pictures,
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password,
        "gender": gender,
        "preferences": preferences,
        "bio": bio,
        "birthdate": birthdate,
        "latitude": lat,
        "longitude": lon,
        "city": city,
        "tags": tags
    })

# Export CSV
df = pd.DataFrame(users)
df.to_csv("utilisateurs_fictifs.csv", index=False, sep=";")

print("✅ Fichier CSV généré avec 500 utilisateurs fictifs")
