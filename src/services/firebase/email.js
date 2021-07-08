import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
 * @param {String} email - A Valid email
 * @param {String} password - Password
 * @returns {Promise} - UserCredentials https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
 */
export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
