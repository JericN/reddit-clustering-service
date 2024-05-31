import { doc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { Docs, Topic } from '$lib/types';

function transformData(doc: QueryDocumentSnapshot): Topic {
    const data = doc.data()
    const topic: Topic = {
        label: data.label,
        rank: data.rank,
        rep_docs: data.rep_docs as Docs[],
        keywords: data.keywords
    }
    return topic;
}

export async function getData() {
    const docRef = doc(db, 'topics', 'worldnews');
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new Error('No such document!');
    }

    const topic = transformData(docSnap);
    return topic;
}

