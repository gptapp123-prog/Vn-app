package vn.vnapp.citizen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(android.os.Bundle savedInstanceState) {
        registerPlugin(InstalledAppsPlugin.class);
        registerPlugin(LocalGeocoderPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
