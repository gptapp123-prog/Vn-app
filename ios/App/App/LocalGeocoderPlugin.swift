import Capacitor
import CoreLocation

@objc(LocalGeocoderPlugin)
public class LocalGeocoderPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LocalGeocoderPlugin"
    public let jsName = "LocalGeocoder"
    public let pluginMethods: [CAPPluginMethod] = [CAPPluginMethod(name: "getPlace", returnType: CAPPluginReturnPromise)]
    @objc func getPlace(_ call: CAPPluginCall) {
        guard let lat = call.getDouble("latitude"), let lon = call.getDouble("longitude"), lat.isFinite, lon.isFinite, abs(lat) <= 90, abs(lon) <= 180 else {
            call.reject("Invalid coordinates", "INVALID_POSITION"); return
        }
        DispatchQueue.main.async {
            let geocoder = CLGeocoder()
            var finished = false
            geocoder.reverseGeocodeLocation(CLLocation(latitude: lat, longitude: lon), preferredLocale: Locale(identifier: "vi_VN")) { places, error in
                DispatchQueue.main.async {
                    if finished { return }; finished = true
                    guard error == nil, let p = places?.first else { call.reject("No place returned", "NO_PLACE"); return }
                    call.resolve(["countryCode": p.isoCountryCode ?? "", "country": p.country ?? "", "province": p.administrativeArea ?? "", "district": p.subAdministrativeArea ?? "", "locality": p.locality ?? "", "ward": p.subLocality ?? ""])
                }
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
                if finished { return }; finished = true; geocoder.cancelGeocode(); call.reject("Place lookup timed out", "PLACE_TIMEOUT")
            }
        }
    }
}

class AppBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() { bridge?.registerPluginInstance(LocalGeocoderPlugin()) }
}
