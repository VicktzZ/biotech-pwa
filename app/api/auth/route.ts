import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json({ message: "Email e senha obrigatórios", status: 400 });
  }

  try {
    const userRef = collection(db, "users");
    const userDoc = await getDocs(userRef);
    const user = userDoc.docs.find(doc => doc.data().email === email);

    if (!user) {
      return Response.json({ message: "Usuário não encontrado", status: 404 });
    }

    const userData = user.data();
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return Response.json({ message: "Senha inválida", status: 401 });
    }

    return Response.json({ id: user.id, message: "Usuário autenticado com sucesso", status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}