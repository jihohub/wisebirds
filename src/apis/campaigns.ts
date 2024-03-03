import { UpdateCampaignProps } from "@/type";
import app from "@lib/firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
} from "firebase/firestore";

export async function fetchCampaigns(page: number, size: number) {
  const db = getFirestore();
  const campaignsCol = collection(db, "campaigns");
  const q = query(
    campaignsCol,
    orderBy("id"),
    startAt((page - 1) * size + 1),
    limit(size)
  );

  const total = await getDocs(collection(db, "campaigns"));
  const res_total = total.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const querySnapshot = await getDocs(q);
  const content = querySnapshot.docs.map((doc) => ({
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
  const empty = !content.length;

  const res = {
    content,
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

export async function updateCampaigns({
  campaignId,
  newEnabledStatus,
}: UpdateCampaignProps) {
  const db = getFirestore(app);
  const campaignIdStr =
    campaignId < 10 ? `campaign0${campaignId}` : `campaign${campaignId}`;
  const campaignRef = doc(db, "campaigns", campaignIdStr);

  try {
    await updateDoc(campaignRef, {
      enabled: newEnabledStatus,
    });
  } catch (error) {
    console.error(error);
  }
}
