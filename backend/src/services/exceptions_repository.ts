import admin from 'firebase-admin';

const firestore = () => admin.firestore();

export const exceptionsRepository = {
  async listRecent({ limit }: { limit: number }) {
    const snapshot = await firestore()
      .collection('exceptions')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => ({
      exceptionId: doc.id,
      ...doc.data(),
    }));
  },
};

