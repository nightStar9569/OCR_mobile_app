import 'package:flutter/material.dart';

import 'core/di/service_locator.dart';
import 'core/logging/logger.dart';
import 'core/sync/background_sync.dart';
import 'presentation/app.dart';

class Bootstrap {
  const Bootstrap._();

  static Future<void> run() async {
    await ServiceLocator.configure();
    await BackgroundSync.initialize();

    runApp(const MeterReadingApp());
  }
}

