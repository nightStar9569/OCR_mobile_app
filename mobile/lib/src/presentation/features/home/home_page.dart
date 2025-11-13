import 'package:flutter/material.dart';

import '../../../core/di/service_locator.dart';
import '../../../domain/models/reading.dart';
import '../../../domain/models/user.dart';
import '../../../domain/repositories/reading_repository.dart';
import '../../../services/sync/sync_service.dart';
import '../../widgets/primary_button.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.user});

  final User user;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _repository = ServiceLocator.resolve<ReadingRepository>();

  @override
  void initState() {
    super.initState();
    ServiceLocator.resolve<SyncService>().start();
  }

  @override
  void dispose() {
    ServiceLocator.resolve<SyncService>().stop();
    super.dispose();
  }

  Future<void> _captureReading() async {
    final reading = Reading(
      id: DateTime.now().microsecondsSinceEpoch.toString(),
      accountNumber: 'ACC-123',
      readingValue: 1200,
      confidence: 0.9,
      method: ReadingMethod.ocr,
      status: ReadingStatus.pending,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    );
    await _repository.saveReading(reading);
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Reading captured locally')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Today\'s Assignments'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Welcome, ${widget.user.fullName}'),
              const SizedBox(height: 16),
              PrimaryButton(label: 'Capture Reading', onPressed: _captureReading),
            ],
          ),
        ),
      ),
    );
  }
}

