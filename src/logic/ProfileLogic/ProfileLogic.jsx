import { useState, useContext, useRef } from "react";
import { updateProfile, updateEmail, deleteUser,updatePassword } from "firebase/auth";
import { storage, auth, db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfileLogic() {
    const {name,setName,password,setPassword,setEmail,setPhotoURL,userID,family,setFamily,userDocID,setUsername} = useContext(AuthContext);
    const [changedName, setChangedName] = useState("");
    const [changedUsername, setChangedUsername] = useState("");
    const [changedFamily, setChangedFamily] = useState("");
    const [changedEmail, setChangedEmail] = useState("");
    const [changedPhoto, setChangedPhoto] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();
  
    const avatarInputRef = useRef(null);
    const nameInputRef = useRef(null);
    const familyInputRef = useRef(null);
    const usernameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
  
    const handleChangeName = (event) => {
      setChangedName(event.target.value);
    };
    const handleChangeFamily = (event) => {
      setChangedFamily(event.target.value);
    };
    const handleChangeUsername = (event) => {
      setChangedUsername(event.target.value);
    };
    const handleChangeEmail = (event) => {
      setChangedEmail(event.target.value);
    };
    const handleChangeAvatar = (event) => {
      setChangedPhoto(event.target.files[0]);
    };
    const handleCurrentPassword = (event) => {
      setCurrentPassword(event.target.value);
    };
    const handleNewPassword = (event) => {
      setNewPassword(event.target.value);
    };
    const handleConfirmPassword = (event) => {
      setConfirmPassword(event.target.value);
    };

    const handleDeleteUser = () => {
      deleteUser(auth.currentUser)
      .then(() => {
        deleteDoc(doc(db, "users", userDocID));
        toast.success("User successfully deleted !")
      })
      .then(() => {
        navigate('/login')
      }).catch((error) => {
        console.error("Error with deleting user :" + error)
      });
    }

    const handleCancel = () => {
      avatarInputRef.current.value = null;
      nameInputRef.current.value = null;
      usernameInputRef.current.value = null;
      familyInputRef.current.value = null;
      emailInputRef.current.value = null;
      passwordInputRef.current.value = null;
    };
  
    const updateInfo = (event) => {
      event.preventDefault();
      const userRef = doc(db, "users", userDocID);
  
      if(currentPassword!== password) {
        toast.error("Please input your current password to update profile");
        return;
      }
      if(newPassword && newPassword!==confirmPassword) {
        toast.error("Your changed passwords doesn't match");
        return;
      }
      if (!changedPhoto && !newPassword && !changedEmail && !changedName && !changedFamily && !changedUsername) {
        toast.error("No information to update");
        return;
      }
      
      async function uploadPhoto(file, currentUser) {
        const fileRef = ref(storage, `${currentUser}.png`);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        const changeAvatar = await updateProfile(auth.currentUser, { photoURL: photoURL });
        return photoURL;
      }
      
      if (changedPhoto) {
        uploadPhoto(changedPhoto, userID)
          .then((photoURL) => {
            setPhotoURL(photoURL);
            return updateDoc(userRef, { avatar: photoURL });
          })
          .then(() => {
            avatarInputRef.current.value = null;
          })
          .catch((error) => {
            console.error("Error updating photo:", error);
          });
      }
      
  
      if (changedEmail) {
        updateEmail(auth.currentUser, changedEmail).then(() => {
          updateDoc(userRef, { email: changedEmail })
            .then(() => {
              setEmail(changedEmail);
            })
            .catch((error) => {
              console.log("Error updating email:", error);
            });
        });
      }
      if (changedUsername) {
          updateDoc(userRef, { username: changedUsername })
            .then(() => {
              setUsername(changedUsername);
            })
            .catch((error) => {
              console.log("Error updating username:", error);
            });
      }
      if (changedName) {
        let fixname = `${changedName} ${family}`;
        updateProfile(auth.currentUser, { displayName: fixname })
          .then(() => {
            updateDoc(userRef, { name: changedName })
              .then(() => {
                setName(changedName);
              })
              .catch((error) => {
                console.log("Error updating name:", error);
              });
          })
          .catch((error) => {
            console.log("Error updating profile:", error);
          });
      }
      if (changedFamily) {
        let fixfamily = `${name} ${changedFamily}`;
        updateProfile(auth.currentUser, { displayName: fixfamily })
          .then(() => {
            updateDoc(userRef, { family: changedFamily })
              .then(() => {
                setFamily(changedFamily);
              })
              .catch((error) => {
                console.log("Error updating family:", error);
              });
          })
          .catch((error) => {
            console.log("Error updating profile:", error);
          });
      }
      if (newPassword) {
        updatePassword(auth.currentUser, newPassword).then(() => {
          updateDoc(userRef, { password: newPassword })
        }).then(() => {
          setPassword(newPassword);
        })
        .catch((error) => {
          console.log("Error updating password:", error);
        });
      }
      toast.success("User information updated !")
    };

  return {
    avatarInputRef,
    nameInputRef,
    familyInputRef,
    usernameInputRef,
    emailInputRef,
    passwordInputRef,
    handleChangeName,
    handleChangeFamily,
    handleChangeUsername,
    handleChangeEmail,
    handleChangeAvatar,
    handleCurrentPassword,
    handleNewPassword,
    handleConfirmPassword,
    handleDeleteUser,
    handleCancel,
    updateInfo,
  };
}

