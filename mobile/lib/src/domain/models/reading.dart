import 'package:equatable/equatable.dart';

class Reading extends Equatable {
  const Reading({
    required this.id,
    required this.accountNumber,
    required this.readingValue,
    required this.confidence,
    required this.method,
    required this.status,
    this.imagePath,
    this.imageUrl,
    this.flaggedForMl = false,
    this.gpsLat,
    this.gpsLng,
    required this.createdAt,
    required this.updatedAt,
  });

  final String id;
  final String accountNumber;
  final double readingValue;
  final double confidence;
  final ReadingMethod method;
  final ReadingStatus status;
  final String? imagePath;
  final String? imageUrl;
  final bool flaggedForMl;
  final double? gpsLat;
  final double? gpsLng;
  final DateTime createdAt;
  final DateTime updatedAt;

  Reading copyWith({
    String? id,
    String? accountNumber,
    double? readingValue,
    double? confidence,
    ReadingMethod? method,
    ReadingStatus? status,
    String? imagePath,
    String? imageUrl,
    bool? flaggedForMl,
    double? gpsLat,
    double? gpsLng,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Reading(
      id: id ?? this.id,
      accountNumber: accountNumber ?? this.accountNumber,
      readingValue: readingValue ?? this.readingValue,
      confidence: confidence ?? this.confidence,
      method: method ?? this.method,
      status: status ?? this.status,
      imagePath: imagePath ?? this.imagePath,
      imageUrl: imageUrl ?? this.imageUrl,
      flaggedForMl: flaggedForMl ?? this.flaggedForMl,
      gpsLat: gpsLat ?? this.gpsLat,
      gpsLng: gpsLng ?? this.gpsLng,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  List<Object?> get props => [
        id,
        accountNumber,
        readingValue,
        confidence,
        method,
        status,
        imagePath,
        imageUrl,
        flaggedForMl,
        gpsLat,
        gpsLng,
        createdAt,
        updatedAt,
      ];
}

enum ReadingMethod { ocr, manual }

enum ReadingStatus { pending, verified, synced, rejected }

