import admin from 'firebase-admin';

const firestore = () => admin.firestore();

type SaveBatchParams = {
  uid: string;
  readings: Array<{
    readingId: string;
    accountNumber: string;
    readingValue: number;
    confidence: number;
    method: string;
    status: string;
    flaggedForMl?: boolean;
    imageUrl: string;
    capturedAt: string;
    updatedAt: string;
    gps?: { lat: number; lng: number };
    deviceId: string;
  }>;
};

type FetchSinceParams = {
  uid: string;
  since?: string;
};

const collectionName = 'readings';

export const readingsRepository = {
  async saveBatch({ uid, readings }: SaveBatchParams) {
    const batch = firestore().batch();
    const collection = firestore().collection(collectionName);

    readings.forEach((reading) => {
      const docRef = collection.doc(reading.readingId);
      batch.set(docRef, {
        uid,
        accountNumber: reading.accountNumber,
        readingValue: reading.readingValue,
        confidence: reading.confidence,
        method: reading.method,
        status: reading.status,
        flaggedForMl: reading.flaggedForMl ?? false,
        imageUrl: reading.imageUrl,
        gps: reading.gps ?? null,
        deviceId: reading.deviceId,
        capturedAt: admin.firestore.Timestamp.fromDate(new Date(reading.capturedAt)),
        updatedAt: admin.firestore.Timestamp.fromDate(new Date(reading.updatedAt)),
      });
    });

    await batch.commit();

    const flagged = readings.filter((reading) => reading.flaggedForMl);
    if (flagged.length > 0) {
      await Promise.all(
        flagged.map((reading) =>
          firestore()
            .collection('ml_training_pool')
            .doc(reading.readingId)
            .set({
              readingId: reading.readingId,
              accountNumber: reading.accountNumber,
              imageUrl: reading.imageUrl,
              capturedAt: admin.firestore.Timestamp.fromDate(new Date(reading.capturedAt)),
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }),
        ),
      );
    }
  },

  async updateStatus({
    readingId,
    status,
    supervisorId,
  }: {
    readingId: string;
    status: 'verified' | 'rejected';
    supervisorId: string;
  }) {
    await firestore().collection(collectionName).doc(readingId).update({
      status,
      supervisorId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  },

  async fetchSince({ uid, since }: FetchSinceParams) {
    let query = firestore().collection(collectionName).where('uid', '==', uid);
    if (since) {
      query = query.where('updatedAt', '>=', new Date(since));
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};

