import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";

export async function fetchUsers(page: number, size: number) {
  const db = getFirestore();
  const campaignsCol = collection(db, "users");
  const q = query(
    campaignsCol,
    orderBy("id"),
    startAt((page - 1) * size + 1),
    limit(size)
  );

  const total = await getDocs(collection(db, "users"));
  const res_total = total.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const total_elements = res_total.length;
  const total_pages = Math.ceil(total_elements / size);
  const last = page === total_pages;
  const number = page;
  const sort = { orderBy: "date" };
  const number_of_elements = page * size;
  const first = page === 1;
  const empty = !user.length;

  const res = {
    user,
    total_elements,
    total_pages,
    last,
    number,
    size,
    sort,
    number_of_elements,
    first,
    empty,
  };

  return res;
}

export async function postUser(data) {
  const db = getFirestore();
  const usersCollectionRef = collection(db, "users");
  const snapshot = await getDocs(usersCollectionRef);
  let maxId = 0;

  snapshot.forEach((doc) => {
    const userId = parseInt(doc.id.replace("users", ""));
    if (userId > maxId) {
      maxId = userId;
    }
  });

  const newUserId = `users${maxId + 1}`;
  const newUserRef = doc(db, "users", newUserId);

  const newData = {
    ...data,
    id: maxId + 1,
    lastLoggedIn: new Date(),
    company: { id: 1, name: "와이즈버즈" },
  };

  await setDoc(newUserRef, newData);
}

export async function updateUser({ userId, name }) {
  const db = getFirestore();
  const userIdStr = userId < 10 ? `users0${userId}` : `users${userId}`;
  const userRef = doc(db, "users", userIdStr);

  await updateDoc(userRef, {
    name: name,
  });
}

export async function checkEmailDuplication(email: string) {
  const db = getFirestore();
  const usersCol = collection(db, "users");
  const q = query(usersCol, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
