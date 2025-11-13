import '../../domain/models/sync_queue_item.dart';
import 'local_database.dart';

class SyncQueueDao {
  SyncQueueDao(this._localDatabase);

  final LocalDatabase _localDatabase;

  Future<void> insert(SyncQueueItem item) => _localDatabase.enqueueSyncItem(item);

  Future<List<SyncQueueItem>> pending() => _localDatabase.pendingSyncItems();

  Future<void> markSynced(String queueId) => _localDatabase.updateSyncItemStatus(
        queueId: queueId,
        status: SyncStatus.synced,
        lastAttemptAt: DateTime.now(),
      );

  Future<void> incrementRetry(
    String queueId, {
    required int retryCount,
    required DateTime lastAttemptAt,
  }) =>
      _localDatabase.updateSyncItemStatus(
        queueId: queueId,
        status: SyncStatus.failed,
        retryCount: retryCount,
        lastAttemptAt: lastAttemptAt,
      );
}

