class UpdateParametersDto {
    constructor(data) {
        if (data.firstname !== undefined && data.firstname !== null)
            this.firstname = data.firstname.trim();

        if (data.lastname !== undefined && data.lastname !== null)
            this.lastname = data.lastname.trim();

        this.gender = data.gender;
        this.preferences = data.preferences;

        if (data.username !== undefined && data.username !== null)
            this.username = data.username.trim();

        if (data.email !== undefined && data.email !== null)
            this.email = data.email.trim();
        
        this.currentPassword = data.currentPassword;
        this.password = data.password;
        this.lat = data.lat;
        this.lng = data.lng;
        this.city = data.city;

        const allowedFields = [
            'firstname', 'lastname', 'gender', 'preferences',
            'username', 'email', 'currentPassword', 'password',
            'lat', 'lng', 'city'
        ];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (this.firstname !== undefined && (typeof this.firstname !== 'string' || this.firstname.length < 1 || this.firstname.length > 20))
            errors.push('Firstname doit contenir entre 1 et 20 caractères.');

        if (this.lastname !== undefined && (typeof this.lastname !== 'string' || this.lastname.length < 1 || this.lastname.length > 20))
            errors.push('Lastname doit contenir entre 1 et 20 caractères.');

        if (this.gender !== undefined && !['man', 'woman'].includes(this.gender))
            errors.push("Gender doit être 'man' ou 'woman'.");

        if (this.preferences !== undefined && !['men', 'women', 'bi'].includes(this.preferences))
            errors.push("Preferences doit être 'men', 'women' ou 'bi'.");

        if (this.username !== undefined && (typeof this.username !== 'string' || this.username.length < 3 || this.username.length > 10))
            errors.push('Username doit contenir entre 3 et 10 caractères.');

        if (this.email !== undefined && (typeof this.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)))
            errors.push('Email invalide.');

        if (this.currentPassword !== undefined && (typeof this.currentPassword !== 'string' || this.currentPassword.length < 10))
            errors.push('CurrentPassword doit contenir au moins 10 caractères.');

        if (this.password !== undefined && (typeof this.password !== 'string' || this.password.length < 10))
            errors.push('Password doit contenir au moins 10 caractères.');

        if (this.lat !== undefined) {
            if (typeof this.lat !== 'number' || isNaN(this.lat))
                errors.push('Lat doit être un nombre.');
            else if (!Number.isFinite(this.lat) || Math.abs(this.lat) > 90)
                errors.push('Lat doit être compris entre -90 et 90.');
            else if (!/^-?\d+(\.\d{1,6})?$/.test(this.lat.toString()))
                errors.push('Lat ne doit pas dépasser 6 décimales.');
        }

        if (this.lng !== undefined ) {
            if (typeof this.lng !== 'number' || isNaN(this.lng))
                errors.push('Lng doit être un nombre.');
            else if (!Number.isFinite(this.lng) || Math.abs(this.lng) > 180)
                errors.push('Lng doit être compris entre -180 et 180.');
            else if (!/^-?\d+(\.\d{1,6})?$/.test(this.lng.toString()))
                errors.push('Lng ne doit pas dépasser 6 décimales.');
        }

        if (this.city !== undefined && (typeof this.city !== 'string' || this.city.trim() === ''))
            errors.push('City doit être une chaîne non vide.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { UpdateParametersDto };
