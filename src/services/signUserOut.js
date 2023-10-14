import { signOut } from "firebase/auth";

export function signUserOut(auth, setIsAuth, setEmail, navigate) {
    return () => {
      signOut(auth)
        .then(() => {
          localStorage.setItem("isAuth", false);
          setIsAuth(false);
          setEmail("");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    };
  }