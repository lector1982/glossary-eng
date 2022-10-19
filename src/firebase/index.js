import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCB6Drp2rYfaAHEDWlvPfQAG2xu6PXA8t4",
	authDomain: "glossary-eng.firebaseapp.com",
	projectId: "glossary-eng",
	storageBucket: "gs://glossary-eng.appspot.com",
	messagingSenderId: "91360070974",
	appId: "1:91360070974:web:c5101b086c25d06da4306f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const categoriesRef = collection(db, 'categories');

const storage = getStorage(app);

export default { categoriesRef, storage };