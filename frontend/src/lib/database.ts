import { doc, getDoc, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { Docs, Topic } from '$lib/types';

function transformData(doc: QueryDocumentSnapshot): Topic[] {
    const data = doc.data().topics as Topic[];
    
    const topics = data.map((data:Topic) => {
        return {
            label: data.label,
            rep_docs: data.rep_docs as Docs[],
            keywords: data.keywords
        }
    }) as Topic[];

    return topics;
}

export async function getData(subreddit: string) {
    const docRef = doc(db, 'topics', subreddit);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
        throw new Error('No such document!');
    }

    return transformData(docSnap) as Topic[];
}

