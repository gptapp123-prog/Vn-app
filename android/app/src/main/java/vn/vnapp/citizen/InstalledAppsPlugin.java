package vn.vnapp.citizen;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;

/** Device-local, explicit chooser. Only selected package+icon cross the bridge. */
@CapacitorPlugin(name = "InstalledApps")
public class InstalledAppsPlugin extends Plugin {
    private AlertDialog dialog;
    private PluginCall pending;
    private static String fold(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("\\p{M}", "")
            .replace('đ', 'd').replace('Đ', 'D').toLowerCase(Locale.ROOT);
    }
    private int dp(int value) { return Math.round(value * getContext().getResources().getDisplayMetrics().density); }
    private android.content.SharedPreferences choices() { return getContext().getSharedPreferences("selected-apps", 0); }

    @PluginMethod
    public void pickApp(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (pending != null) { call.reject("Bộ chọn ứng dụng đang mở."); return; }
            pending = call;
            try {
                Intent query = new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER);
                List<ResolveInfo> results = getContext().getPackageManager().queryIntentActivities(query, 0);
                List<ResolveInfo> all = new ArrayList<>();
                HashSet<String> seen = new HashSet<>();
                for (ResolveInfo info : results) {
                    String pkg = info.activityInfo.packageName;
                    if (!pkg.equals(getContext().getPackageName()) && info.activityInfo.exported && seen.add(pkg)) all.add(info);
                }
                all.sort(Comparator.comparing(x -> fold(x.loadLabel(getContext().getPackageManager()).toString())));
                List<ResolveInfo> shown = new ArrayList<>(all);
                LinearLayout layout = new LinearLayout(getContext());
                layout.setOrientation(LinearLayout.VERTICAL);
                layout.setPadding(dp(16), dp(8), dp(16), 0);
                EditText filter = new EditText(getContext());
                filter.setHint("Tìm tên ứng dụng đã cài");
                filter.setSingleLine(true);
                layout.addView(filter);
                ListView list = new ListView(getContext());
                BaseAdapter adapter = new BaseAdapter() {
                    public int getCount() { return shown.size(); }
                    public Object getItem(int i) { return shown.get(i); }
                    public long getItemId(int i) { return i; }
                    public View getView(int i, View recycled, ViewGroup parent) {
                        ResolveInfo info = shown.get(i);
                        LinearLayout row = new LinearLayout(getContext());
                        row.setGravity(android.view.Gravity.CENTER_VERTICAL);
                        row.setPadding(dp(4), dp(10), dp(4), dp(10));
                        ImageView icon = new ImageView(getContext());
                        icon.setImageDrawable(info.loadIcon(getContext().getPackageManager()));
                        row.addView(icon, new LinearLayout.LayoutParams(dp(40), dp(40)));
                        TextView label = new TextView(getContext());
                        label.setText(info.loadLabel(getContext().getPackageManager()));
                        label.setTextSize(16); label.setPadding(dp(12), 0, 0, 0);
                        row.addView(label, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
                        return row;
                    }
                };
                list.setAdapter(adapter);
                TextView empty = new TextView(getContext()); empty.setText("Không có ứng dụng phù hợp.");
                layout.addView(empty); list.setEmptyView(empty);
                layout.addView(list, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, Math.min(dp(360), getContext().getResources().getDisplayMetrics().heightPixels * 2 / 5)));
                filter.addTextChangedListener(new TextWatcher() {
                    public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
                    public void onTextChanged(CharSequence s, int start, int before, int count) {
                        String q = fold(s.toString()); shown.clear();
                        for (ResolveInfo info : all) if (fold(info.loadLabel(getContext().getPackageManager()) + " " + info.activityInfo.packageName).contains(q)) shown.add(info);
                        adapter.notifyDataSetChanged();
                    }
                    public void afterTextChanged(Editable e) {}
                });
                dialog = new AlertDialog.Builder(getActivity()).setTitle("Thêm ứng dụng từ điện thoại")
                    .setView(layout).setNegativeButton("Hủy", (d, which) -> cancel()).create();
                dialog.setOnCancelListener(d -> cancel());
                list.setOnItemClickListener((parent, view, position, id) -> {
                    try {
                        ResolveInfo info = shown.get(position);
                        Drawable drawable = info.loadIcon(getContext().getPackageManager());
                        Bitmap bitmap = Bitmap.createBitmap(128, 128, Bitmap.Config.ARGB_8888);
                        drawable.setBounds(0, 0, 128, 128); drawable.draw(new Canvas(bitmap));
                        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                        bitmap.compress(Bitmap.CompressFormat.PNG, 100, bytes); bitmap.recycle();
                        String pkg = info.activityInfo.packageName;
                        if (!choices().edit().putBoolean(pkg, true).commit()) throw new IllegalStateException();
                        JSObject result = new JSObject();
                        result.put("packageName", pkg);
                        result.put("name", info.loadLabel(getContext().getPackageManager()).toString());
                        result.put("icon", "data:image/png;base64," + Base64.encodeToString(bytes.toByteArray(), Base64.NO_WRAP));
                        PluginCall selected = pending; pending = null;
                        dialog.dismiss(); dialog = null;
                        if (selected != null) selected.resolve(result);
                    } catch (Exception e) { fail("Không đọc được ứng dụng. Hãy chọn lại."); }
                });
                dialog.show();
            } catch (Exception e) { fail("Không mở được danh sách ứng dụng."); }
        });
    }
    private void cancel() {
        PluginCall call = pending; pending = null;
        if (dialog != null) { dialog.dismiss(); dialog = null; }
        if (call != null) { JSObject result = new JSObject(); result.put("cancelled", true); call.resolve(result); }
    }
    private void fail(String message) {
        PluginCall call = pending; pending = null;
        if (dialog != null) { dialog.dismiss(); dialog = null; }
        if (call != null) call.reject(message);
    }
    @PluginMethod
    public void openApp(PluginCall call) {
        String pkg = call.getString("packageName", "");
        if (!pkg.matches("[a-zA-Z][a-zA-Z0-9_]*(\\.[a-zA-Z0-9_]+)+") || !choices().getBoolean(pkg, false)) {
            call.reject("Chọn lại ứng dụng bằng nút Thêm từ điện thoại để cho phép mở trên máy này."); return;
        }
        getActivity().runOnUiThread(() -> {
            try {
                Intent intent = getContext().getPackageManager().getLaunchIntentForPackage(pkg);
                if (intent == null) { call.reject("Ứng dụng đã bị gỡ hoặc không thể mở trên máy này."); return; }
                getActivity().startActivity(intent);
                JSObject result = new JSObject(); result.put("completed", true); call.resolve(result);
            } catch (Exception e) { call.reject("Không mở được ứng dụng đã chọn."); }
        });
    }
    @Override protected void handleOnDestroy() { cancel(); }
}
