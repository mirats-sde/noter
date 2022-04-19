import React, { useEffect, useState } from 'react'
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header"
import styles from "./editor.module.css";
import { auth, db } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDocs, query, collection, orderBy, limit } from "firebase/firestore";
import { uuid } from 'uuidv4';

const Editor = () => {
    const doc_id = Date.now();
    const [editorTitle, setEditorTitle] = useState("");

    const [user, loading] = useAuthState(auth);
    // const generateId = () => {
    //     return getDocs(
    //         query(
    //             collection(
    //                 db,
    //                 "UserData",
    //                 "Users",
    //                 user.uid,
    //                 "editorData",
    //                 "userEditorData"
    //             ),
    //             orderBy("id", "desc"),
    //             limit(1)
    //         )
    //     )
    // }
    const saveData = async () => {
       
       
            await editor.save().then((outputData) => {
                console.log('Article data: ', outputData)
                // generateId().then(async (snapshot) => {
    
                //     if(snapshot?.docs[0]){
                //         doc_id = snapshot.docs[0].data()?.id;
                //         doc_id = doc_id + 1;
                //     }
                //     else{
                //         doc_id = 1000;
                //     }
                // })
    
                db.collection("UserData").doc("Users").collection(user.email).doc("editor").collection("userEditor").doc(String(doc_id)).set({
                    title: editorTitle,
                    notes: outputData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    doc_id: doc_id,
                },
                    { merge: true })
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        
    }

    const editor = new EditorJS({
        holder: "editorjs",
        tools: {
            header: Header,
        },
        onChange: () => saveData()
    })

    return (
        <>
            <h1>Editorrr</h1>
            <div className={styles.main_container}>
                {/* <div className={styles.editor_title}>
                    <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Enter Your Title" />
                </div> */}
                <div className={styles.container}>
                    <div id="editorjs">

                    </div>
                </div>
            </div>
        </>
    )
}

export default Editor