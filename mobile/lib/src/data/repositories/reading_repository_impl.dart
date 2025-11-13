import '../../domain/models/reading.dart';
import '../../domain/repositories/reading_repository.dart';
import '../../services/auth/auth_service.dart';
import '../datasources/local_database.dart';

class ReadingRepositoryImpl implements ReadingRepository {
  ReadingRepositoryImpl({
    required LocalDatabase localDatabase,
    required AuthService authService,
  })  : _localDatabase = localDatabase,
        _authService = authService;

  final LocalDatabase _localDatabase;
  final AuthService _authService;

  @override
  Future<void> saveReading(Reading reading) async {
    await _localDatabase.upsertReading(reading);
  }

  @override
  Future<List<Reading>> fetchPendingReadings() async {
    return _localDatabase.getPendingReadings();
  }
}

