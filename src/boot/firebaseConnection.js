import firebaseServices from '../services/firebase'

export default ({ router, store, Vue }) => {
  const config = process.env.QENV.FIREBASE_CONFIG;
  firebaseServices.fBInit(config);

  // Tell the application what to do when the
  // authentication state has changed
  firebaseServices.auth().onAuthStateChanged((user) => {
    firebaseServices.handleOnAuthStateChanged(store.store, user)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseServices;
  store.$fb = firebaseServices;
}
