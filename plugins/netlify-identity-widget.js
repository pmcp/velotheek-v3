import netlifyIdentity from 'netlify-identity-widget'
// TODO: Take away identity widget js for admin
export default async (context, inject) => {
  inject('netlifyIdentity', netlifyIdentity)
  await context.store.dispatch('auth/init', context)
}
