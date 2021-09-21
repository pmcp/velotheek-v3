export default function ({ route, store, redirect }) {
	let lang = store.state.lang
	const safeRoute = '/homepage.' + store.state.lang
	if(store.state.auth.user) {
	//	Logged in
	} else {
	//	Not logged in
		if (route.path === '/' || ( route.path.includes("locations") || route.path.includes("bookings"))) {
			return redirect('/homepage.fr')
		}

	}



	// if (!store.state.auth.user) {
	// 	return redirect('/homepage.' + store.state.lang)
	// }



	// } else {
	// 	if (route.path === '/') {
	// 		console.log('user, but home')
	// 		if (store.state.lang) {
	// 			return redirect('/homepage.' + store.state.lang)
	// 		} else {
	// 			return redirect('/homepage.nl')
	// 		}
	// 	}
	//
	// }
}
	