import 'package:workmanager/workmanager.dart';

import '../../domain/models/sync_queue_item.dart';
import '../di/service_locator.dart';
import '../logging/logger.dart';
import '../../services/sync/sync_service.dart';

class BackgroundSync {
  BackgroundSync._();

  static const _taskName = 'sync_queue_drain';

  static Future<void> initialize() async {
    await Workmanager().initialize(
      _callbackDispatcher,
      isInDebugMode: false,
    );

    await Workmanager().registerPeriodicTask(
      _taskName,
      _taskName,
      frequency: const Duration(minutes: 15),
      existingWorkPolicy: ExistingWorkPolicy.keep,
    );
  }

  static void _callbackDispatcher() {
    Workmanager().executeTask((task, inputData) async {
      Logger.info('Executing background sync task: $task');
      final syncService = ServiceLocator.resolve<SyncService>();
      await syncService.start();
      await syncService.stop();
      return true;
    });
  }

  static Future<void> enqueueNow(SyncQueueItem item) async {
    final syncService = ServiceLocator.resolve<SyncService>();
    await syncService.enqueue(item);
  }
}

