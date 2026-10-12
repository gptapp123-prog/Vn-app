package vn.app.bridge;

import android.app.Activity;
import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/** Native integration source, not an APK. Attach only to trusted, owned VN App UI. */
public final class KnownAppLauncher {
    private final Activity activity;
    private final Map<String, String> packages;
    private final WebView webView;
    public KnownAppLauncher(Activity activity) {
        this(activity, null);
    }
    public KnownAppLauncher(Activity activity, WebView trustedOwnedWebView) {
        this.activity = activity;
        this.webView = trustedOwnedWebView;
        Map<String, String> ids = new HashMap<>();
        ids.put("evncskh", "com.evn.cskh.vn");
        ids.put("vneid", "com.vnid");
        ids.put("vnetraffic", "com.ots.c08.vnetraffic");
        ids.put("icpv", "vn.dcs.icpvbook");
        ids.put("congdanso", "vn.gov.tphcm.hcmccitizen");
        ids.put("etax", "com.etax.icanhan");
        ids.put("vssid", "com.bhxhapp");
        ids.put("sos", "com.ots.cbkc.catp");
        ids.put("help114", "com.mobicall.mobicall114");
        ids.put("momo", "com.mservice.momotransfer");
        ids.put("payoo", "vn.payoo");
        ids.put("medpro", "vn.com.medpro");
        ids.put("umccare", "vn.com.umc.patient");
        ids.put("vnedu", "com.vnptit.vnedu.parent");
        ids.put("vtvgo", "vn.vtv.vtvgo");
        ids.put("tiki", "vn.tiki.app.tikiandroid");
        ids.put("shopee", "com.shopee.vn");
        ids.put("lazada", "com.lazada.android");
        ids.put("samsungmembers", "com.samsung.android.voc");
        ids.put("icpvtthc", "com.vnpt.dvc.vptw");
        packages = Collections.unmodifiableMap(ids);
    }
    @JavascriptInterface
    public String openKnownApp(String appId) {
        String packageId = packages.get(appId);
        if (packageId == null) return "UNKNOWN_APP";
        final Intent launch;
        try { launch = activity.getPackageManager().getLaunchIntentForPackage(packageId); }
        catch (SecurityException failure) { return "LAUNCH_FAILED"; }
        if (launch == null) return "NOT_INSTALLED";
        activity.runOnUiThread(() -> {
            try {
                activity.startActivity(launch);
                report(appId, "STARTED");
            }
            catch (ActivityNotFoundException | SecurityException failure) {
                report(appId, "LAUNCH_FAILED");
            }
        });
        return "REQUESTED"; // Request queued, not proof that app opened or payment occurred.
    }
    private void report(String appId, String status) {
        if (webView == null || !packages.containsKey(appId)) return;
        // appId is one of the fixed keys above; status is a fixed literal, never external input.
        webView.evaluateJavascript("if(window.VNAppLaunchResult){window.VNAppLaunchResult(\""
                + appId + "\",\"" + status + "\");}", null);
    }
}
