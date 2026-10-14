package vn.vnapp.citizen;

import android.location.Address;
import android.location.Geocoder;
import android.os.Build;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicBoolean;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Foreground lookup through the OS service; no address/coordinate logging or storage. */
@CapacitorPlugin(name = "LocalGeocoder")
public class LocalGeocoderPlugin extends Plugin {
    @PluginMethod public void getPlace(PluginCall call) {
        Double lat = call.getDouble("latitude"), lon = call.getDouble("longitude");
        if (lat == null || lon == null || !Double.isFinite(lat) || !Double.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
            call.reject("Invalid coordinates", "INVALID_POSITION"); return;
        }
        if (!Geocoder.isPresent()) { call.reject("No geocoder on this device", "NO_GEOCODER"); return; }
        Geocoder geocoder = new Geocoder(getContext(), new Locale("vi", "VN"));
        AtomicBoolean done = new AtomicBoolean(false);
        Runnable timeout = () -> { if (done.compareAndSet(false, true)) call.reject("Place lookup timed out", "PLACE_TIMEOUT"); };
        android.os.Handler handler = new android.os.Handler(android.os.Looper.getMainLooper());
        handler.postDelayed(timeout, 10000);
        java.util.function.Consumer<List<Address>> finish = addresses -> {
            if (!done.compareAndSet(false, true)) return;
            handler.removeCallbacks(timeout);
            if (addresses == null || addresses.isEmpty()) { call.reject("No place returned", "NO_PLACE"); return; }
            Address a = addresses.get(0); JSObject result = new JSObject();
            result.put("countryCode", a.getCountryCode()); result.put("country", a.getCountryName());
            result.put("province", a.getAdminArea()); result.put("district", a.getSubAdminArea());
            result.put("locality", a.getLocality()); result.put("ward", a.getSubLocality());
            call.resolve(result);
        };
        java.util.function.Consumer<String> fail = ignored -> {
            if (done.compareAndSet(false, true)) { handler.removeCallbacks(timeout); call.reject("Cannot resolve place", "NO_PLACE"); }
        };
        try {
            if (Build.VERSION.SDK_INT >= 33) geocoder.getFromLocation(lat, lon, 1, new Geocoder.GeocodeListener() {
                @Override public void onGeocode(List<Address> addresses) { finish.accept(addresses); }
                @Override public void onError(String errorMessage) { fail.accept(errorMessage); }
            });
            else new Thread(() -> { try { finish.accept(geocoder.getFromLocation(lat, lon, 1)); } catch (Exception e) { fail.accept(""); } }, "vn-place-lookup").start();
        } catch (Exception e) { fail.accept(""); }
    }
}
