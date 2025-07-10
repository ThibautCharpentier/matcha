# matcha

![alt-text](https://github.com/ThibautCharpentier/matcha/blob/main/previews/welcome.png)

matcha is a 42 school team project where we have to create **SPA (Single Page Application) dating website**.

## Status

* in progress (waiting for evaluation)

## Rules

For this project, we used **React** as a frontend framework and we could use a "micro-framework" like **ExpressJS** as a backend framework. We also needed to create our queries manually.

Our entire app must be compatible with **Firefox** and **Chrome**. It must be usable on a mobile phone and keep an acceptable layout on small resolutions and the entire website must be secure.

The app must be able to register a user. After registration, an email with a unique link is sent to the registered user to verify his account.
Users must be able to login using their username and password and also receive an email allowing them to reset their password if they forget it.
Additionnaly, users must be able to log out with just one click from any page to the website.

![alt-text](https://github.com/ThibautCharpentier/matcha/blob/main/previews/profile.png)

Once a user is connected, he must fill out his profile by providing the following informations:

* The gender.
* Sexual preferences.
* A biography.
* A list of interests with tags.
* Up to five pictures, including one to be used as a profile picture.

At any time, the user must be able to modify these informations, as well as his last name, first name and email address.
The user must be located using **GPS** positioning. If the user does not want to be positioned, we have to find a way to locate him even without his knowledge.

Users must be able to check who has viewed their profile, as well as who has "liked" them. Also, they must have a public "fame rating".

![alt-text](https://github.com/ThibautCharpentier/matcha/blob/main/previews/matchs.png)

Users must be able to easily get a list of suggestions that match their profile:

* We have to manage heterosexuality, homosexuality and bisexuality.
* Matchs are based on : same geographic area as the user, a maximum of common tags and a maximum "fame rating". We must prioritize showing people from the same geographical area.
* The list must be sortable and filterable by age, location, "fame rating" and common tags.

Users must be able to conduct an advanced search by selecting one or more criteria from those presented above. Like the suggested list, the resulting list must be sortable and filterable by age, location, "fame rating" and common tags.

A user must be able to view the profiles of other users. When a user views a profile, it must be added to his visit history.
The user must be able to:

* **"Like"** another user’s profile. When two people "like" each other’s profiles, they will be considered "connected" and can start chatting.
* A user must also be able to remove his "like" to a user whom he had previously "liked". The user will no longer generate notifications and he will not be able to chat with him anymore.
* **Report** a user as a "fake account".
* **Block** a user. A blocked user will no longer appear in the search results and will not generate additional notifications. And, of course, it will no longer be possible to chat with him.

![alt-text](https://github.com/ThibautCharpentier/matcha/blob/main/previews/conversations.png)

When two users are connected, they must be able to "chat" in real-time. The user must be able to see from any page if a new message is received.

A user must be notified in real-time of the following events:

* When the user receives a "like".
* When the user’s profile has been viewed.
* When the user receives a message.
* When "liked" user also "likes" the user back.
* When a connected user "unlikes" the user.

A user must be able to see, from any page, that a notification hasn’t been read.

## Usage

First of all, you need to create an **.env** file in the root of the project, like this:
```
LOCAL_IP=localhost
LOCAL_IP2=127.0.0.1

#ifconfig | grep 'inet'
#OR
#ip addr | grep 'inet '
HOST_IP=

BACK_PORT=8000
FRONT_PORT=5173

#Settings of your database, by default it can be:
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=matcha

#Your emails for admin session
MAIL_ADMIN1=
MAIL_ADMIN2=

MAIL_TOKEN_EXPIRATION=10m

#Put whatever you want for these one's:
SECRET_TOKEN_KEY=ItIsASecretTokenKey
ADMIN_SECRET_TOKEN_KEY=ItIsAnAdminSecretTokenKey

JWT_ADMINTOKEN_EXPIRATION=15m

JWT_ACCESSTOKEN_EXPIRATION=30m
COOKIE_ACCESSTOKEN_EXPIRATION=1800000
JWT_REFRESHTOKEN_EXPIRATION=1d
COOKIE_REFRESHTOKEN_EXPIRATION=86400000

#You have to use an email communication platform to send email (like sendgrid for example) and put your settings here:
EMAIL_HOST=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_PORT=
EMAIL_SENDER=

```

Then, run the project with:
```
docker compose up --build
```
If the project is already built, use:
```
docker compose up
```

Then, go to your local IP address at port 5173:
```
http://localhost:5173/
```
```
http://127.0.0.1:5173/
```
***
Made by:
* Ismérie George: [@Ismerie](https://github.com/Ismerie) <ismerie.george@gmail.com>
* Thibaut Charpentier: <thibaut.charpentier42@gmail.com>
