import { db } from "@/services/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export async function GET(_: Request, { params }: any) {
    const { id } = params;

    if (!id) {
        return Response.json({ message: "ID do usuário obrigatório", status: 400 });
    }

    try {
        const userDocRef = doc(db, "users", id);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return Response.json({ message: "Usuário não encontrado", status: 404 });
        }

        const userData = userDoc.data();
        return Response.json(userData, { status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}

export async function DELETE(_: Request, { params }: any) {
    const { id } = params;

    if (!id) {
        return Response.json({ message: "ID do usuário obrigatório", status: 400 });
    }

    try {
        const userDocRef = doc(db, "users", id);
        await deleteDoc(userDocRef);

        return Response.json({ message: "Usuário deletado com sucesso", status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}

export async function PATCH(req: Request, { params }: any) {
    const body = await req.json();
    const { id } = params;

    if (!id) {
        return Response.json({ message: "ID do usuário obrigatório", status: 400 });
    }

    try {
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, body);
        
        return Response.json({ message: "User atualizado com sucesso", status: 200 });
    } catch (error) {
        return Response.json({ error, status: 500 });
    }
}

