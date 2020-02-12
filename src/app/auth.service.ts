import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public authenticated = false;
    a: string;

    constructor(private router: Router) {
    }
    SendVerificationMail() {
        return firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
            });
    }

    registerUser(value) {
        return firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
            .then((result) => {
            this.SendVerificationMail(); // Sending email verification notification, when new user registers
        }).catch((error) => {
            window.alert(error.message);
        });
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    (res) => {
                        if (res.user.emailVerified !== true) {
                            this.SendVerificationMail();
                            window.alert('Please validate your email address. Kindly check your inbox.');

                        } else {
                            resolve(res);
                        }

                    },
                    err => reject(err)),
                this.a = value.email;
        });
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut()
                    .then(() => {
                        console.log('LOG Out');
                        resolve();
                    }).catch((error) => {
                    reject();
                } );
            }
        });
    }


    userDetails() {
        return firebase.auth().currentUser;
    }

}
