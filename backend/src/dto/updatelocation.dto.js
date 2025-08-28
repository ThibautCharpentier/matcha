class UpdateLocationDto {
    constructor(data) {
        this.lat = data.lat;
        this.lng = data.lng;
        this.city = data.city.trim();

        const allowedFields = ['lat', 'lng', 'city'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.lat !== 'number' || isNaN(this.lat))
            errors.push('Lat doit être un nombre.');
        else if (!Number.isFinite(this.lat) || Math.abs(this.lat) > 90)
            errors.push('Lat doit être compris entre -90 et 90.');
        else if (!/^-?\d+(\.\d{1,6})?$/.test(this.lat.toString()))
            errors.push('Lat ne doit pas dépasser 6 décimales.');

        if (typeof this.lng !== 'number' || isNaN(this.lng))
            errors.push('Lng doit être un nombre.');
        else if (!Number.isFinite(this.lng) || Math.abs(this.lng) > 180)
            errors.push('Lng doit être compris entre -180 et 180.');
        else if (!/^-?\d+(\.\d{1,6})?$/.test(this.lng.toString()))
            errors.push('Lng ne doit pas dépasser 6 décimales.');

        if (typeof this.city !== 'string' || this.city === '')
            errors.push('City doit être une chaîne non vide.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { UpdateLocationDto };
