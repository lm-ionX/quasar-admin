import firebase from 'firebase/app'

// storage
import 'firebase/storage'

// authentication
import 'firebase/auth'

import axios from 'axios'

/**
 * Returns Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @returns {Auth} - The Firebase Auth service interface
 */
export const auth = () => {
  return firebase.auth()
}

export const getImages = async (cat, subcat) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const objectRef = storageRef.child(`${cat}/${subcat}/`);
  let itemsUrl = [];

  objectRef.listAll().then(
    result => result.items.forEach(
      item => {
        item.getDownloadURL().then(response => itemsUrl.push(response));
      }
    )
  );

  return itemsUrl;
}

export const saveImage = async (cat, subcat, image) => {
  if(image) {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const objectRef = storageRef.child(`${cat}/${subcat}/${image.name}`);

    let uploadTask = objectRef.put(image, image.name);
    uploadTask.on('state_changed', snapshot => {
        progress += (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload progress is: ' + progress);
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
      // Handle unsuccessful uploads
        return false;
      }, function() {
        return true;
      });
  }
}

export const saveImages = async (cat, subcat, images) => {
  if(images && images.length > 0) {
    let totalProgress = 0;
    const nbFiles = images.length;

    images.forEach(img => {
      saveImage(cat, subcat, img);
    });
  }
}

/**
 * Async function providing the application time to
 * wait for firebase to initialize and determine if a
 * user is authenticated or not with only a single observable.
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged
 * @param {Object} store - Vuex store
 * @returns {Promise} - A promise that return firebase.Unsubscribe
 */
export const ensureAuthIsInitialized = async (store) => {
  //if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}

/**
 * Convenience method to initialize firebase app
 * https://firebase.google.com/docs/reference/js/firebase?authuser=1#initializeapp
 * @param  {Object} config - FIREBASE_CONFIG during the build process
 * @returns {App} - Creates and initializes a Firebase app instance.
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

/**
 * Handle the auth state of the user and set it in the auth store module.
 * Also sets up redirection if the user loses authentication. The action
 * method will determine where the application routes to.
 * @param  {Object} store - Vuex Store
 * @param  {Object} currentUser - Firebase currentUser
 */
export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthState = isAuthenticated(store.store);
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true
  })

  // If the user loses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    store.dispatch('auth/routeUserToAuth')
  }
}

/**
 * @param  {Object} store - Vuex store
 * @return {Boolean} - isAuthenticated
 */
export const isAuthenticated = (store) => {
  if(!store) return false;
  return store.state.auth.isAuthenticated
}

/**
 * Removes firebase auth token
 * @returns {Promise} - Void
 */
export const logoutUser = () => {
  return auth().signOut()
}
