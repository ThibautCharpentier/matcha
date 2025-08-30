import { Pool } from 'pg';
import fs from 'fs';
import csv from 'csv-parser';
import bcrypt from 'bcryptjs';

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "matcha",
	password: "password",
	port: 5432,
});

const insertUsers = async (client) => {
	const promises = [];

	await new Promise((resolve, reject) => {
		fs.createReadStream('users.csv')
			.pipe(csv({ separator: ';' }))
			.on('data', (row) => {
				const promise = (async () => {
					try {
						const hashedPassword = await bcrypt.hash(row.password, 10);
						await client.query(`INSERT INTO public.users (id, username, picture_profile, pictures, firstname, lastname, email, password, verified, gender, preferences, bio, birthdate, gps, latitude, longitude, city) VALUES ('${row.id}', '${row.username}', '${row.picture_profile}', '${row.pictures}', '${row.firstname}', '${row.lastname}', '${row.email}', '${hashedPassword}', true, '${row.gender}', '${row.preferences}', '${row.bio}', '${row.birthdate}', true, '${row.latitude}', '${row.longitude}', '${row.city}') ON CONFLICT (id) DO NOTHING`);

						const tags = row.tags.split(",");
						const list_tags = tags.map(tag => `'${tag}'`).join(", ");
						const tags_id = await client.query(`SELECT id FROM public.interest WHERE name IN (${list_tags})`);

						for (let i = 0; i < tags_id.rows.length; i++) {
							await client.query(`INSERT INTO public.user_interest (user_id, interest) VALUES (${row.id}, ${tags_id.rows[i].id})`);
						}
					} catch (err) {
						console.error("Erreur d'insertion :", err);
						reject(err);
					}
				})();
				promises.push(promise);
			})
			.on('end', async () => {
				try {
					await Promise.all(promises);
					console.log("Success !");
					resolve();
				} catch (err) {
					reject(err);
				}
			})
			.on('error', (err) => {
				console.error("Erreur de lecture CSV :", err);
				reject(err);
			});
	});
};

const client = await pool.connect();
try {
	await insertUsers(client);
} finally {
	client.release();
}
