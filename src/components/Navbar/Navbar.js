import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io"
import { FcFlashOn, FcBearish, FcHome } from "react-icons/fc"
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionOnce } from "react-firebase-hooks/firestore"
const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    let [notesId, setNotesId] = useState([]);
    const [showList, setShowList] = useState(false);
    const [snapshot] = useCollectionOnce(
        db.collection("UserData")
            .doc("Users")
            .collection(user.email)
            .doc("editor")
            .collection("userEditor")
            .orderBy("timestamp", "desc")
    );

    snapshot?.docs.map((doc) => (
        console.log(doc.data())
    ))
    // useEffect(() => {
    //     db.collection("UserData")
    //     .doc("Users")
    //     .collection(user.email)
    //     .doc("editor")
    //     .collection("userEditor")
    //     .orderBy("timestamp", "desc")
    //     .onSnapshot(snapshot => {
    //         console.log(snapshot)
    //         setNotesId(snapshot.docs.map(doc => (
    //             {
    //                 id: doc.id
    //             }
    //         )));
    //     })
    //     console.log(notesId);
    // },[])
    return (
        <div className={styles.navbar}>

            <div className={styles.navbar_heading}>
                noter
            </div>
            <div className={styles.navbar_list_container}>
                <div className={styles.navbar_list_gs}>
                    <div className={styles.navbar_list_gsh} onClick={() => setShowList(!showList)}>
                        {
                            showList ?  <div className={styles.navbar_list_fi}><AiFillCaretDown /></div> :
                            <div className={styles.navbar_list_fi}><AiFillCaretRight /></div>
                        }
                        {/* <div className={styles.navbar_list_fi}><AiFillCaretRight /></div> */}
                        <div className={styles.navbar_list_gsi}><IoIosCreate /></div>
                        <p>Getting started</p>
                    </div>

                    <div className={showList ? styles.notes_lists : styles.notes_lists_hide}>
                        {/* zIndex ? styles.box_9_main_overlay : styles.box_9_main */}
                        <div className={styles.notes_list}>
                            <div className={styles.notes_list_fi}><AiFillCaretRight /></div>
                            <p>Note 1</p>
                        </div>
                    </div>

                </div>
                <div className={styles.navbar_list}>
                    <div className={styles.navbar_list_fi}><AiFillCaretRight /></div>
                    <div className={styles.navbar_list_gsi}><FcFlashOn /></div>
                    <p>Quick Note</p>
                </div>
                <div className={styles.navbar_list}>
                    <div className={styles.navbar_list_fi}><AiFillCaretRight /></div>
                    <div className={styles.navbar_list_gsi}><FcBearish /></div>
                    <p>Work Space</p>
                </div>
                <div className={styles.navbar_list}>
                    <div className={styles.navbar_list_fi}><AiFillCaretRight /></div>
                    <div className={styles.navbar_list_gsi}><FcHome /></div>
                    <p>Personal Home</p>
                </div>
                <div>
                    {
                        snapshot?.docs.map((doc) => (
                            <p>{doc.data().doc_id}</p>
                        ))
                    }
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar