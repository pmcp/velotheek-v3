export default function ({ route, store, redirect }) {
	console.log('route', route)

	  if (route.path !== '/' && !store.state.auth.user) {
		return redirect('/')
	  }

	}
	