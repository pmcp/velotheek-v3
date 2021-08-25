export default function ({ route, store, redirect }) {

	const safeRoute = '/homepage.' + store.state.lang
	if (route.path === '/') {
		return redirect(safeRoute)
	} else {
		if (!store.state.auth.user && route.path !== safeRoute ) {
			return redirect(safeRoute)
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
	