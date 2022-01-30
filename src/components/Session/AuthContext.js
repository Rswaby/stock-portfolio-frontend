import { 
    useContext, 
    useState, 
    useEffect, 
    createContext 
} from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut 
} from "firebase/auth";

import { Auth } from '../Firebase/firebasesp';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({ children }){
    const [currentUser , setCurrentUser ] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    const signup = (email, password, fullName) => {
        let promise = new Promise(function (resolve, reject) {
            createUserWithEmailAndPassword(Auth ,email, password).then((ref) => {
              ref.user.updateProfile({
                displayName: fullName,
              });
              resolve(ref);
            })
            .catch((error) => reject(error));
        });
        return promise;
      };

    const signin = (email, password) => {
        let promise = new Promise(function (resolve, reject) {
            signInWithEmailAndPassword(Auth, email, password)
            .then((ref) => {
              resolve(ref);
            })
            .catch((error) => {
              reject(error);
            });
        });
        return promise;
      };
    const signout = () => {
        return signOut(Auth);
      };

    const passwordReset = (email) => {
        let promise = new Promise(function (resolve, reject) {
            sendPasswordResetEmail(Auth,email)
            .then(() => {
              resolve(`Password Reset Email sent to ${email}`);
            })
            .catch((error) => {
              reject(error);
            });
        });
        return promise;
      };

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setIsLoading(false);
        });
        return unsubscribe;
    }, [currentUser]);  
    
    const value = {
        currentUser,
        actions: {
            signUp: signup,
            signIn: signin,
            signOut: signout,
            passWordReset: passwordReset
        }
    };
    return (
        <AuthContext.Provider value={value}>
          {!isLoading && children}
        </AuthContext.Provider>
      );  
}