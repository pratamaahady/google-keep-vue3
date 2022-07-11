import { firestore } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "@firebase/firestore";

class Note {
    constructor ({ id, title, content, is_archive, labels, remind_at, created_at, updated_at, deleted_at}) {
        this.title = title ?? null;
        this.content = content ?? null;
        this.is_archive = Boolean(is_archive);
        this.labels = labels ?? [];
        this.remind_at = remind_at ?? null;
        this.created_at = created_at ?? null;
        this.updated_at = updated_at ?? null;
        this.deleted_at = deleted_at ?? null;

        if(id){
            this.id = id;
        }
    }
}

const notesConverter = {
    toFirestore: (note) => {
        return {
            title: note.title,
            content: note.content,
            is_archive: Boolean(note.is_archive),
            labels: note.labels ?? [],
            remind_at: note.remind_at ?? null,
            created_at: note.created_at ?? null,
            updated_at: note.updated_at ?? null,
            deleted_at: note.deleted_at ?? null,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Note({
            id: snapshot.id,
            title: data.title,
            content: data.content,
            is_archive: Boolean(data.is_archive),
            labels: data.labels ?? [],
            remind_at: data.remind_at ?? null,
            created_at: data.created_at ?? null,
            updated_at: data.updated_at ?? null,
            deleted_at: data.deleted_at ?? null,            
        });
    }
};

export const getCollection = () => collection(firestore, "notes");
export const getRef = (id) => doc(firestore, "notes", id);
export const newInstance = (params) => new Note(params);

export const getNotes = (conditions=[]) => {
    var q = query(getCollection(), ...conditions)
    return getDocs(q);
}

export const getAllNotes = () => {
    var conditions = [
        where("is_archive","==",false), // Not Archive
        where("deleted_at","==",null), // Not Trash
    ];

    return getNotes(conditions);
}

export const getArchiveNotes = () => {
    var conditions = [
        where("is_archive","==",true), // is Archive
        where("deleted_at","==",null), // Not Trash
    ];

    return getNotes(conditions);
}

export const getReminderNotes = () => {
    var conditions = [
        where("remind_at","!=",null), // is Reminder
        where("deleted_at","==",null), // Not Trash
    ];

    return getNotes(conditions);
}

export const getLabelNotes = (label) => {
    var conditions = [
        where("labels","array-contains",label), // find some label
        where("deleted_at","==",null), // not trash
    ];

    return getNotes(conditions);
}

export const getTrashNotes = () => {
    var conditions = [
        where("deleted_at","!=",null), // is trash
    ];

    return getNotes(conditions);
}

export const createNote = (params) => {
    const data = new Note(params);
    return addDoc(getCollection(), notesConverter.toFirestore(data));
}

export const updateNote = (id, param) => {
    return setDoc(getRef(id), { ...param, updated_at: new Date() }, { merge: true });
}

export const archiveNote = (id) => {
    return updateNote(id, { is_archive: true });
}

export const unarchiveNote = (id) => {
    return updateNote(id, { is_archive: false });
}

export const deleteNote = (id) => {
    return updateNote(id, { deleted_at: new Date() });
}

export const restoreNote = (id) => {
    return updateNote(id, { deleted_at: null })
}

export const deletePermanentNote = (id) => {
    return deleteDoc(getRef(id));
}