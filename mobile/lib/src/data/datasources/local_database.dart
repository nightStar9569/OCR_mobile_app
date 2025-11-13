import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import '../../domain/models/device.dart';
import '../../domain/models/reading.dart';
import '../../domain/models/sync_queue_item.dart';
import '../../domain/models/user.dart';
import '../mappers/device_mapper.dart';
import '../mappers/reading_mapper.dart';
import '../mappers/sync_queue_mapper.dart';
import '../mappers/user_mapper.dart';

class LocalDatabase {
  LocalDatabase(this._db);

  final Database _db;

  static const _dbName = 'ocr_meter_reader.db';
  static const _dbVersion = 1;

  static Future<LocalDatabase> create() async {
    final dir = await getApplicationDocumentsDirectory();
    final path = p.join(dir.path, _dbName);
    final db = await openDatabase(
      path,
      version: _dbVersion,
      onCreate: (db, version) async {
        await db.execute(_usersTableSql);
        await db.execute(_devicesTableSql);
        await db.execute(_readingsTableSql);
        await db.execute(_syncQueueTableSql);
      },
    );
    return LocalDatabase(db);
  }

  Future<void> upsertUser(User user) async {
    await _db.insert(
      'users',
      UserMapper.toJson(user),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<User?> getActiveUser() async {
    final rows = await _db.query('users', limit: 1);
    if (rows.isEmpty) return null;
    return UserMapper.fromJson(rows.first);
  }

  Future<void> upsertDevice(Device device) async {
    await _db.insert(
      'devices',
      DeviceMapper.toJson(device),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> upsertReading(Reading reading) async {
    await _db.insert(
      'readings',
      ReadingMapper.toJson(reading),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<Reading>> getPendingReadings() async {
    final rows = await _db.query(
      'readings',
      where: 'status IN (?, ?)',
      whereArgs: ['pending', 'synced'],
    );
    return rows.map(ReadingMapper.fromJson).toList();
  }

  Future<void> enqueueSyncItem(SyncQueueItem item) async {
    await _db.insert(
      'sync_queue_local',
      SyncQueueMapper.toJson(item),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<SyncQueueItem>> pendingSyncItems() async {
    final rows = await _db.query(
      'sync_queue_local',
      where: 'status = ?',
      whereArgs: ['pending'],
      orderBy: 'created_at ASC',
    );
    return rows.map(SyncQueueMapper.fromJson).toList();
  }

  Future<void> updateSyncItemStatus({
    required String queueId,
    required SyncStatus status,
    int? retryCount,
    DateTime? lastAttemptAt,
  }) async {
    final payload = <String, Object?>{
      'status': status.name,
      'last_attempt_at': lastAttemptAt?.toIso8601String(),
    };
    if (retryCount != null) {
      payload['retry_count'] = retryCount;
    }
    await _db.update(
      'sync_queue_local',
      payload,
      where: 'queue_id = ?',
      whereArgs: [queueId],
    );
  }

  Future<void> close() => _db.close();
}

const _usersTableSql = '''
CREATE TABLE users(
  user_id TEXT PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT,
  status TEXT,
  last_login TEXT,
  created_at TEXT,
  updated_at TEXT,
  id_token TEXT
);
''';

const _devicesTableSql = '''
CREATE TABLE devices(
  device_id TEXT PRIMARY KEY,
  assigned_to TEXT,
  model TEXT,
  status TEXT,
  last_sync TEXT,
  created_at TEXT,
  updated_at TEXT
);
''';

const _readingsTableSql = '''
CREATE TABLE readings(
  reading_id TEXT PRIMARY KEY,
  account_number TEXT,
  reading_value REAL,
  confidence REAL,
  method TEXT,
  status TEXT,
  image_path TEXT,
  image_url TEXT,
  gps_lat REAL,
  gps_lng REAL,
  flagged_for_ml INTEGER,
  created_at TEXT,
  updated_at TEXT
);
''';

const _syncQueueTableSql = '''
CREATE TABLE sync_queue_local(
  queue_id TEXT PRIMARY KEY,
  reading_id TEXT,
  operation TEXT,
  payload TEXT,
  retry_count INTEGER,
  status TEXT,
  last_attempt_at TEXT,
  created_at TEXT
);
''';

