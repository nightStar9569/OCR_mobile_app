import 'package:geolocator/geolocator.dart';

class GeolocationService {
  Future<Position?> currentPosition() async {
    final permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      final request = await Geolocator.requestPermission();
      if (request == LocationPermission.denied ||
          request == LocationPermission.deniedForever) {
        return null;
      }
    }

    if (!(await Geolocator.isLocationServiceEnabled())) {
      return null;
    }

    return Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
  }
}

