import admin from 'firebase-admin';

const firestore = () => admin.firestore();

export const auditLogRepository = {
  async write({
    action,
    userId,
    description,
  }: {
    action: string;
    userId: string;
    description: string;
  }) {
    await firestore().collection('audit_logs').add({
      action,
      userId,
      description,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  },
};

