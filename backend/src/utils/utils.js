function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getQueryAllReports() {
	const query = `
		SELECT
			id,
			firstname,
			lastname,
			status,
			last_connection,
			bio,
			picture_profile,
			pictures,
			EXTRACT(YEAR FROM AGE(birthdate)) AS age,
			famerating,
			city,
			(
				SELECT ARRAY_AGG(public.interest.name)
				FROM public.user_interest
				JOIN public.interest ON public.user_interest.interest = public.interest.id
				WHERE public.user_interest.user_id = public.users.id
			) AS tags,
			(
				SELECT count(public.report.target)::INTEGER
				FROM public.report
				WHERE public.report.target = public.users.id
			) AS nb_report
		FROM
			public.users
		WHERE
			(
				SELECT count(public.report.target)::INTEGER
				FROM public.report
				WHERE public.report.target = public.users.id
			) > 0`
	return (query)
}

function getInitialQueryMatchs(res_user) {
	let query = `
		SELECT
			id,
			firstname,
			lastname,
			status,
			last_connection,
			bio,
            picture_profile,
            pictures,
			EXTRACT(YEAR FROM AGE(birthdate)) AS age,
			famerating,
			city,
			(
				SELECT ARRAY_AGG(public.interest.name)
				FROM public.user_interest
				JOIN public.interest ON public.user_interest.interest = public.interest.id
				WHERE public.user_interest.user_id = public.users.id
			) AS tags,
			(
				SELECT count(public.interest.name)::INTEGER
				FROM public.user_interest
				JOIN public.interest ON public.user_interest.interest = public.interest.id
				WHERE public.user_interest.user_id = public.users.id
				AND public.interest.id = ANY($1)
			) AS common_tags,
			(
				ROUND(6371 * acos(
					sin(radians($2)) * sin(radians(latitude)) +
					cos(radians($2)) * cos(radians(latitude)) *
					cos(radians(longitude) - radians($3))
				))
			) AS distance
		FROM
			public.users
		WHERE
			id != $4
			AND
			city IS NOT NULL
			AND
			latitude IS NOT NULL
			AND
			longitude IS NOT NULL
			AND
			verified != false
			AND
			`
	if (res_user.gender == "man")
		query += `(preferences = 'men' OR preferences = 'bi')`
	else
		query += `(preferences = 'women' OR preferences = 'bi')`
	query += `
			AND
			`
	switch (res_user.preferences) {
		case "men":
			query += `(gender = 'man')`
			break;
		case "women":
			query += `(gender = 'woman')`
			break;
		default:
			query += `(gender = 'woman' OR gender = 'man')`
	}

	query += `
			AND
				(
					SELECT count(*)
					FROM public.interaction
					WHERE public.interaction.target = public.users.id AND public.interaction.user_id = $4
				) = 0
			AND
				(
					SELECT count(*)
					FROM public.interaction
					WHERE public.interaction.target = $4 AND public.interaction.user_id = public.users.id AND (public.interaction.action = 'block' OR public.interaction.action = 'unlike' OR public.interaction.action = 'dislike')
				) = 0`
	return (query)
}

function getFilterQueryMatchs(filter) {
	let query = ``
	let age = "EXTRACT(YEAR FROM AGE(birthdate))"
	let distance = `(
				ROUND(6371 * acos(
					sin(radians($2)) * sin(radians(latitude)) +
					cos(radians($2)) * cos(radians(latitude)) *
					cos(radians(longitude) - radians($3))
				))
			)`
	let tags = `(
				SELECT count(public.interest.name)::INTEGER
				FROM public.user_interest
				JOIN public.interest ON public.user_interest.interest = public.interest.id
				WHERE public.user_interest.user_id = public.users.id
				AND public.interest.id = ANY($1)
			)`
	if (filter.includes("age18_20"))
		query += `
			AND
			(${age} >= 18 AND ${age} <= 20)`
	else if (filter.includes("age21_30"))
		query += `
			AND
			(${age} >= 21 AND ${age} <= 30)`
	else if (filter.includes("age26_35"))
		query += `
			AND
			(${age} >= 26 AND ${age} <= 35)`
	else if (filter.includes("age31_40"))
		query += `
			AND
			(${age} >= 31 AND ${age} <= 40)`
	else if (filter.includes("age36_45"))
		query += `
			AND
			(${age} >= 36 AND ${age} <= 45)`
	else if (filter.includes("age41_50"))
		query += `
			AND
			(${age} >= 41 AND ${age} <= 50)`
	else if (filter.includes("age46_55"))
		query += `
			AND
			(${age} >= 46 AND ${age} <= 55)`
	else if (filter.includes("age51_60"))
		query += `
			AND
			(${age} >= 51 AND ${age} <= 60)`
	else if (filter.includes("age56_65"))
		query += `
			AND
			(${age} >= 56 AND ${age} <= 65)`
	else if (filter.includes("age61_70"))
		query += `
			AND
			(${age} >= 61 AND ${age} <= 70)`
	else if (filter.includes("age66_75"))
		query += `
			AND
			(${age} >= 66 AND ${age} <= 75)`
	else if (filter.includes("age71_80"))
		query += `
			AND
			(${age} >= 71 AND ${age} <= 80)`
	else if (filter.includes("age81"))
		query += `
			AND
			${age} >= 81`

	if (filter.includes("location10"))
		query += `
			AND
			${distance} < 10`
	else if (filter.includes("location30"))
		query += `
			AND
			${distance} < 30`
	else if (filter.includes("location50"))
		query += `
			AND
			${distance} < 50`
	else if (filter.includes("location100"))
		query += `
			AND
			${distance} < 100`

	if (filter.includes("fameRate90"))
		query += `
			AND
			famerating > 0.9`
	else if (filter.includes("fameRate70"))
		query += `
			AND
			famerating > 0.7`
	else if (filter.includes("fameRate50"))
		query += `
			AND
			famerating > 0.5`
	else if (filter.includes("fameRate30"))
		query += `
			AND
			famerating > 0.3`
	else if (filter.includes("fameRate10"))
		query += `
			AND
			famerating > 0.1`

	if (filter.includes("commonTags1"))
		query += `
			AND
			${tags} >= 1`
	else if (filter.includes("commonTags2"))
		query += `
			AND
			${tags} >= 2`
	else if (filter.includes("commonTags3"))
		query += `
			AND
			${tags} >= 3`
	else if (filter.includes("commonTags5"))
		query += `
			AND
			${tags} >= 5`
	else if (filter.includes("commonTags7"))
		query += `
			AND
			${tags} >= 7`
	return (query)
}

function getOrderByQueryMatchs(sort) {
	let query = `ORDER BY`
	let comma = false
	if (sort.includes('location')) {
		query += `
			distance ASC`
		comma = true
	}
	if (sort.includes('tags')) {
		if (comma == true)
			query +=`,`
		query += `
			common_tags DESC`
		comma = true
	}
	if (sort.includes('fame')) {
		if (comma == true)
			query +=`,`
		query += `
			famerating DESC`
		comma = true
	}
	if (sort.includes('age')) {
		if (comma == true)
			query +=`,`
		query += `
			ABS(EXTRACT(YEAR FROM AGE(birthdate)) - $5) ASC`
		comma = true
	}
	if (!sort.includes('location')) {
		if (comma == true)
			query +=`,`
		query += `
			distance ASC`
		comma = true
	}
	if (!sort.includes('tags')) {
		if (comma == true)
			query +=`,`
		query += `
			common_tags DESC`
		comma = true
	}
	if (!sort.includes('fame')) {
		if (comma == true)
			query +=`,`
		query += `
			famerating DESC`
		comma = true
	}
	if (!sort.includes('age')) {
		if (comma == true)
			query +=`,`
		query += `
			ABS(EXTRACT(YEAR FROM AGE(birthdate)) - $5) ASC`
	}
	return (query)
}

module.exports = { calculateAge, getQueryAllReports, getInitialQueryMatchs, getFilterQueryMatchs, getOrderByQueryMatchs }
