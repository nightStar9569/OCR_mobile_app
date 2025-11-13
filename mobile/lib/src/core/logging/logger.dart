import 'dart:developer' as developer;

class Logger {
  Logger._();

  static void setup() {}

  static void info(String message, {String? tag}) {
    developer.log(message, name: tag ?? 'INFO');
  }

  static void warning(String message, {String? tag, Object? error}) {
    developer.log(message, name: tag ?? 'WARN', error: error);
  }

  static void error(String message, {String? tag, Object? error, StackTrace? stackTrace}) {
    developer.log(
      message,
      name: tag ?? 'ERROR',
      error: error,
      stackTrace: stackTrace,
    );
  }
}

