import { db } from "@/services/firebase";
import { Crop } from "@/types/Crop";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function GET() {
    const snapshot = await getDocs(collection(db, "crops"));
    const crops: Crop[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Crop));
    return Response.json(crops);
}

export async function POST(req: Request) {
    const newCrop: Crop = await req.json();
    const ref = await addDoc(collection(db, "crops"), newCrop);
    return Response.json({ ...newCrop, id: ref.id });
}