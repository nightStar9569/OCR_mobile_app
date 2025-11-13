import 'package:get_it/get_it.dart';

import '../../data/datasources/local_database.dart';
import '../../data/datasources/sync_queue_dao.dart';
import '../../data/repositories/reading_repository_impl.dart';
import '../../domain/repositories/reading_repository.dart';
import '../../services/auth/auth_service.dart';
import '../../services/connectivity/network_monitor.dart';
import '../../services/geolocation/geolocation_service.dart';
import '../../services/ocr/ocr_service.dart';
import '../../services/storage/image_storage_service.dart';
import '../../services/sync/sync_service.dart';
import '../logging/logger.dart';

class ServiceLocator {
  ServiceLocator._();

  static final GetIt _getIt = GetIt.instance;

  static Future<void> configure() async {
    Logger.setup();

    final localDb = await LocalDatabase.create();
    final syncDao = SyncQueueDao(localDb);

    _getIt
      ..registerSingleton<LocalDatabase>(localDb)
      ..registerSingleton<SyncQueueDao>(syncDao)
      ..registerLazySingleton<NetworkMonitor>(NetworkMonitor.new)
      ..registerLazySingleton<AuthService>(AuthService.new)
      ..registerLazySingleton<GeolocationService>(GeolocationService.new)
      ..registerLazySingleton<OcrService>(OcrService.new)
      ..registerLazySingleton<ImageStorageService>(ImageStorageService.new)
      ..registerLazySingleton<SyncService>(
        () => SyncService(
          authService: _getIt(),
          networkMonitor: _getIt(),
          syncQueueDao: _getIt(),
          imageStorageService: _getIt(),
          readingRepository: _getIt(),
        ),
      )
      ..registerLazySingleton<ReadingRepository>(
        () => ReadingRepositoryImpl(
          localDatabase: _getIt(),
          authService: _getIt(),
        ),
      );
  }

  static T resolve<T extends Object>() => _getIt<T>();
}

