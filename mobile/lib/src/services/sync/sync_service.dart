import 'dart:async';

import '../../core/logging/logger.dart';
import '../../data/datasources/sync_queue_dao.dart';
import '../../domain/models/sync_queue_item.dart';
import '../../domain/repositories/reading_repository.dart';
import '../auth/auth_service.dart';
import '../connectivity/network_monitor.dart';
import '../storage/image_storage_service.dart';

class SyncService {
  SyncService({
    required AuthService authService,
    required NetworkMonitor networkMonitor,
    required SyncQueueDao syncQueueDao,
    required ImageStorageService imageStorageService,
    required ReadingRepository readingRepository,
  })  : _authService = authService,
        _networkMonitor = networkMonitor,
        _syncQueueDao = syncQueueDao,
        _imageStorageService = imageStorageService,
        _readingRepository = readingRepository;

  final AuthService _authService;
  final NetworkMonitor _networkMonitor;
  final SyncQueueDao _syncQueueDao;
  final ImageStorageService _imageStorageService;
  final ReadingRepository _readingRepository;

  StreamSubscription<bool>? _networkSubscription;

  Future<void> start() async {
    _networkSubscription = _networkMonitor.onStatusChanged.listen(
      (isOnline) {
        if (isOnline) _drainQueue();
      },
    );
    if (await _networkMonitor.isOnline) {
      await _drainQueue();
    }
  }

  Future<void> stop() async {
    await _networkSubscription?.cancel();
  }

  Future<void> enqueue(SyncQueueItem item) async {
    await _syncQueueDao.insert(item);
    if (await _networkMonitor.isOnline) {
      await _drainQueue();
    }
  }

  Future<void> _drainQueue() async {
    final items = await _syncQueueDao.pending();
    if (items.isEmpty) return;

    final user = await _authService.currentUser();
    if (user == null) return;

    for (final item in items) {
      try {
        // TODO: integrate with backend API client.
        Logger.info('Processing sync item ${item.queueId}');
        await _syncQueueDao.markSynced(item.queueId);
      } catch (error, stackTrace) {
        Logger.error(
          'Failed to sync item ${item.queueId}',
          error: error,
          stackTrace: stackTrace,
        );
        await _syncQueueDao.incrementRetry(
          item.queueId,
          retryCount: item.retryCount + 1,
          lastAttemptAt: DateTime.now(),
        );
      }
    }
  }
}

