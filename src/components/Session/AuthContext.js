import { 
    useContext, 
    useState, 
    useEffect, 
    createContext 
} from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut 
} from "firebase/auth";
import axios from 'axios';

import { Auth } from '../Firebase/firebasesp';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({ children }){
    const [currentUser , setCurrentUser ] = useState();
    const [bankInfo, setBank] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const createStockUser = (id, userName) => {

        axios.post('/api/users/create/', {
          "userID": id,
          "userName": userName,
          "bank": 50000
        }).then((res) => {
          console.log(res)
        }, (error) => { console.log(error) })
    }

    const getUserInfoFromDb = (id) => {
        /**
         * @id userEmail 
         */
        axios.get(`/api/users/${id}`).then((res)=>{
            setBank(res.data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    const signup = (email, password, fullName) => {
        let promise = new Promise(function (resolve, reject) {
            createUserWithEmailAndPassword(Auth ,email, password).then((ref) => {
              ref.user.displayName = fullName;
              createStockUser(email,fullName);
              sendEmailVerification(ref.user)
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
          if (user) getUserInfoFromDb(user.email);
          setIsLoading(false);
        });
        return unsubscribe;
    }, [currentUser,Auth]);  
    console.log("currentUser", currentUser);
    const value = {
        currentUser,
        bankInfo,
        actions: {
            signUp: signup,
            signIn: signin,
            signOut: signout,
            passWordReset: passwordReset,
            getUserInfo: getUserInfoFromDb
        }
    };
    return (
        <AuthContext.Provider value={value}>
          {!isLoading && children}
        </AuthContext.Provider>
      );  
}