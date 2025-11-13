import 'dart:convert';

import '../../domain/models/sync_queue_item.dart';

class SyncQueueMapper {
  static Map<String, Object?> toJson(SyncQueueItem item) {
    return {
      'queue_id': item.queueId,
      'reading_id': item.readingId,
      'operation': item.operation.name,
      'payload': jsonEncode(item.payload),
      'retry_count': item.retryCount,
      'status': item.status.name,
      'last_attempt_at': item.lastAttemptAt?.toIso8601String(),
      'created_at': item.createdAt.toIso8601String(),
    };
  }

  static SyncQueueItem fromJson(Map<String, Object?> json) {
    return SyncQueueItem(
      queueId: json['queue_id']! as String,
      readingId: json['reading_id']! as String,
      operation: SyncOperation.values.firstWhere(
        (operation) => operation.name == json['operation'],
        orElse: () => SyncOperation.create,
      ),
      payload: json['payload'] == null
          ? <String, dynamic>{}
          : jsonDecode(json['payload'] as String) as Map<String, dynamic>,
      retryCount: (json['retry_count'] as int?) ?? 0,
      status: SyncStatus.values.firstWhere(
        (status) => status.name == json['status'],
        orElse: () => SyncStatus.pending,
      ),
      lastAttemptAt: (json['last_attempt_at'] as String?) == null
          ? null
          : DateTime.parse(json['last_attempt_at'] as String),
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }
}

