import os
import random
import shutil

# Chemins des dossiers sources
MAN_DIR = './picture_matcha/man'
WOMAN_DIR = './picture_matcha/woman'
PICTURE_DIR = './picture_matcha/pictures'  # dossier commun pour les 2 images supplémentaires

# Chemin destination
DEST_BASE_DIR = './user_images'

# Liste des utilisateurs générés automatiquement (id de 1001 à 1501)
users = [{'id': i} for i in range(1, 501)]

def get_random_image(folder):
     # Retourne un fichier sans le suffixe "-picture.png"
    files = [f for f in os.listdir(folder) if not f.endswith('-picture.png') and f.endswith('.png')]
    return random.choice(files) if files else None

def get_random_pictures(n=2):
    files = [f for f in os.listdir(PICTURE_DIR) if f.endswith('.png')]
    return random.sample(files, k=min(n, len(files)))

def copy_and_rename(src_folder, src_filename, dest_folder, dest_filename):
    src = os.path.join(src_folder, src_filename)
    dest = os.path.join(dest_folder, dest_filename)
    shutil.copyfile(src, dest)

def main():
    if not os.path.exists(DEST_BASE_DIR):
        os.makedirs(DEST_BASE_DIR)

    for user in users:
        user_id = user['id']

        # Choix du dossier femme ou homme selon l'ID
        if 1 <= user_id <= 251:
            src_folder = WOMAN_DIR
        elif 252 <= user_id <= 501:
            src_folder = MAN_DIR
        else:
            print(f"User ID {user_id} hors plage attendue, on skip")
            continue

        user_dir = os.path.join(DEST_BASE_DIR, f'User{user_id}')
        os.makedirs(user_dir, exist_ok=True)

        main_img = get_random_image(src_folder)
        if main_img:
            base_name = os.path.splitext(main_img)[0]

            # Copier et renommer l'image principale en picture-profile.png
            copy_and_rename(src_folder, main_img, user_dir, 'picture-profile.png')

            # Copier et renommer la version "-picture.png" en pictures-1.png
            picture_version = f"{base_name}-picture.png"
            if os.path.exists(os.path.join(src_folder, picture_version)):
                copy_and_rename(src_folder, picture_version, user_dir, 'pictures-1.png')

        # Copier et renommer 2 images aléatoires depuis picture/
        pics = get_random_pictures(2)
        if len(pics) >= 2:
            copy_and_rename(PICTURE_DIR, pics[0], user_dir, 'pictures-2.png')
            copy_and_rename(PICTURE_DIR, pics[1], user_dir, 'pictures-3.png')

    print("Copie et renommage terminés !")

if __name__ == '__main__':
    main()
