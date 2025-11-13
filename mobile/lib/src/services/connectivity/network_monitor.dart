import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkMonitor {
  NetworkMonitor() {
    _subscription = Connectivity().onConnectivityChanged.listen(
      (event) => _controller.add(event != ConnectivityResult.none),
    );
  }

  final _controller = StreamController<bool>.broadcast();
  late final StreamSubscription _subscription;

  Stream<bool> get onStatusChanged => _controller.stream;

  Future<bool> get isOnline async {
    final result = await Connectivity().checkConnectivity();
    return result != ConnectivityResult.none;
  }

  void dispose() {
    _subscription.cancel();
    _controller.close();
  }
}

