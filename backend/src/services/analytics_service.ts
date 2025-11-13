import admin from 'firebase-admin';

const firestore = () => admin.firestore();

export const analyticsService = {
  async fetchOverview({ uid }: { uid: string }) {
    const readingsSnap = await firestore()
      .collection('readings')
      .where('uid', '==', uid)
      .get();

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const pending = readingsSnap.docs.filter((doc) => doc.get('status') === 'pending')
      .length;
    const flagged = readingsSnap.docs.filter((doc) => doc.get('flaggedForMl') === true)
      .length;
    const today = readingsSnap.docs.filter((doc) => {
      const capturedAt = doc.get('capturedAt') as admin.firestore.Timestamp | null;
      if (!capturedAt) return false;
      return capturedAt.toDate() >= startOfDay;
    }).length;

    return {
      pending,
      flagged,
      today,
    };
  },
};

