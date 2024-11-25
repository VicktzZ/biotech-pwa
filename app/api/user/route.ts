import { db } from "@/services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import bcrypt from 'bcrypt';

export async function GET() {
    const userRef = collection(db, "users");

    const usersSnapshot = await getDocs(userRef);
    const users = usersSnapshot.docs.map(doc => doc.data());
    
    return Response.json({ users });
}

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return Response.json({ error: "Email e senha são obrigatórios", status: 400 });
    }

    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(userRef);

    const existingUser = querySnapshot.docs.find(doc => doc.data().email === email);

    if (existingUser) {
        return Response.json({ error: "Usuário já existe", status: 409 });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userRef = await addDoc(collection(db, "users"), {
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        return Response.json({ id: userRef.id, message: "Usuário criado com sucesso", status: 201 });
    } catch (error) {
        // Handle error
        return Response.json({ error, status: 500 });
    }
}