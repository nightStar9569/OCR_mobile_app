import 'dart:convert';

import 'package:equatable/equatable.dart';

class SyncQueueItem extends Equatable {
  const SyncQueueItem({
    required this.queueId,
    required this.readingId,
    required this.operation,
    required this.payload,
    required this.retryCount,
    required this.status,
    required this.createdAt,
    this.lastAttemptAt,
  });

  final String queueId;
  final String readingId;
  final SyncOperation operation;
  final Map<String, dynamic> payload;
  final int retryCount;
  final SyncStatus status;
  final DateTime createdAt;
  final DateTime? lastAttemptAt;

  SyncQueueItem copyWith({
    String? queueId,
    String? readingId,
    SyncOperation? operation,
    Map<String, dynamic>? payload,
    int? retryCount,
    SyncStatus? status,
    DateTime? createdAt,
    DateTime? lastAttemptAt,
  }) {
    return SyncQueueItem(
      queueId: queueId ?? this.queueId,
      readingId: readingId ?? this.readingId,
      operation: operation ?? this.operation,
      payload: payload ?? this.payload,
      retryCount: retryCount ?? this.retryCount,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      lastAttemptAt: lastAttemptAt ?? this.lastAttemptAt,
    );
  }

  String get payloadJson => jsonEncode(payload);

  @override
  List<Object?> get props => [
        queueId,
        readingId,
        operation,
        payload,
        retryCount,
        status,
        createdAt,
        lastAttemptAt,
      ];
}

enum SyncOperation { create, update, delete }

enum SyncStatus { pending, processing, failed, synced }

