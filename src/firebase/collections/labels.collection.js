import { firestore } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, writeBatch } from "@firebase/firestore";

export class Label {
    constructor ({ id, name}) {
        this.name = name ?? null;

        if(id){
            this.id = id;
        }
    }
}

const labelsConverter = {
    toFirestore: (label) => {
        return {
            name: label.name,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Note({
            id: snapshot.id,
            name: data.name,
        });
    }
};

export const getCollection = () => collection(firestore, "labels");
export const getRef = (id) => doc(firestore, "labels", id);


export const getLabels = (conditions=[]) => {
    var q = query(getCollection(), ...conditions)
    return getDocs(q);
}

export const createLabel = (param) => {
    return addDoc(getCollection(), param);
}

export const updateLabel = (id, param) => {
    return setDoc(getRef(id), { ...param, updated_at: new Date() }, { merge: true });
}

export const deleteLabel = (id) => {
    return deleteDoc(getRef(id));
}