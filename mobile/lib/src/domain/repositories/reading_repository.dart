import '../models/reading.dart';

abstract class ReadingRepository {
  Future<void> saveReading(Reading reading);
  Future<List<Reading>> fetchPendingReadings();
}

