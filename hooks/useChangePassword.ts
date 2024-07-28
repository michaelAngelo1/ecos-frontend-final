import { useState } from "react";

export default function useChangePassword() {
  const [lastPass, setLastPass] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPas, setConPas] = useState<string>("");

  return {
    lastPass,
    setLastPass,
    password,
    setPassword,
    conPas,
    setConPas,
  };
}
