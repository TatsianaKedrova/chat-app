import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';


export const firestoreDataBase = firebase.firestore();
export const ref = firestore().collection('users');



