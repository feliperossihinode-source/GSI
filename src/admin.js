import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

document.getElementById("criarUser").onclick = async () => {
  const email = document.getElementById("novoEmail").value;
  const tipo = document.getElementById("tipo").value;

  await addDoc(collection(db, "usuarios"), {
    email,
    tipo
  });

  alert("Usuário cadastrado");
};
