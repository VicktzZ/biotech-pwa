import { db } from "@/services/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ message: "ID da plantação obrigatório", status: 400 });
    }

    try {
        const cropDocRef = doc(db, "crops", id);
        const cropDoc = await getDoc(cropDocRef);

        if (!cropDoc.exists()) {
            return Response.json({ message: "Plantação não encontrada", status: 404 });
        }

        const cropData = cropDoc.data();
        return Response.json(cropData, { status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}

export async function PATCH(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ message: "ID da plantação obrigatório", status: 400 });
    }

    try {
        const body = await req.json();
        const cropDocRef = doc(db, "crops", id);
        await updateDoc(cropDocRef, body);

        return Response.json({ message: "Plantação atualizada com sucesso", status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ message: "ID da plantação obrigatório", status: 400 });
    }

    try {
        const cropDocRef = doc(db, "crops", id);
        await deleteDoc(cropDocRef);

        return Response.json({ message: "Plantação deletada com sucesso", status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}
