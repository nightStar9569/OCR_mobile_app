import '../../domain/models/reading.dart';

class ReadingMapper {
  static Map<String, Object?> toJson(Reading reading) {
    return {
      'reading_id': reading.id,
      'account_number': reading.accountNumber,
      'reading_value': reading.readingValue,
      'confidence': reading.confidence,
      'method': reading.method.name,
      'status': reading.status.name,
      'image_path': reading.imagePath,
      'image_url': reading.imageUrl,
      'gps_lat': reading.gpsLat,
      'gps_lng': reading.gpsLng,
      'flagged_for_ml': reading.flaggedForMl ? 1 : 0,
      'created_at': reading.createdAt.toIso8601String(),
      'updated_at': reading.updatedAt.toIso8601String(),
    };
  }

  static Reading fromJson(Map<String, Object?> json) {
    return Reading(
      id: json['reading_id']! as String,
      accountNumber: json['account_number'] as String? ?? '',
      readingValue: (json['reading_value'] as num?)?.toDouble() ?? 0,
      confidence: (json['confidence'] as num?)?.toDouble() ?? 0,
      method: ReadingMethod.values.firstWhere(
        (method) => method.name == json['method'],
        orElse: () => ReadingMethod.ocr,
      ),
      status: ReadingStatus.values.firstWhere(
        (status) => status.name == json['status'],
        orElse: () => ReadingStatus.pending,
      ),
      imagePath: json['image_path'] as String?,
      imageUrl: json['image_url'] as String?,
      gpsLat: (json['gps_lat'] as num?)?.toDouble(),
      gpsLng: (json['gps_lng'] as num?)?.toDouble(),
      flaggedForMl: (json['flagged_for_ml'] as int? ?? 0) == 1,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }
}

