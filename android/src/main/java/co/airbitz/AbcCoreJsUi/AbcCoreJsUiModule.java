
package co.airbitz.AbcCoreJsUi;
import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;

import com.squareup.whorlwind.ReadResult;
import com.squareup.whorlwind.SharedPreferencesStorage;
import com.squareup.whorlwind.Whorlwind;

import okio.ByteString;
import rx.Observable;
import rx.schedulers.Schedulers;
import rx.android.schedulers.AndroidSchedulers;

public class AbcCoreJsUiModule extends ReactContextBaseJavaModule {
    private static final String TAG = AbcCoreJsUiModule.class.getSimpleName();
    private static final String ABC_CORE_JS_UI_MODULE = "AbcCoreJsUi";
    private Context AppContext;
    private Activity mActivity = null;
    private SharedPreferencesStorage mStorage;
    private boolean mHasSecureElement = false;
    private Whorlwind mWhorlwind;
    private rx.Subscription mSubscription;
    private ImageView mFingerprintIcon;
    private TextView mFingerprintStatus;
    private MaterialDialog mFingerprintDialog;

    static final long ERROR_TIMEOUT_MILLIS  = 1600;
    static final long SUCCESS_DELAY_MILLIS  = 750;

    public AbcCoreJsUiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.AppContext = reactContext;
    }

    @Override
    public String getName() {
        return ABC_CORE_JS_UI_MODULE;
    }

    @ReactMethod
    public void supportsTouchId(Promise promise) {
        promise.resolve(checkHardwareSupport());
    }

    @ReactMethod
    public void setKeychainString (String value, String key, Promise promise) {
        Observable.just(value)
                .observeOn(Schedulers.io())
                .subscribe(val -> {
                    mWhorlwind.write(key, ByteString.encodeUtf8(val));
                    promise.resolve(true);
                }, throwable -> {
                    Log.e("ERROR", "setKeyChainString threw error", throwable);
                    promise.resolve(false);
                });
    }

    @ReactMethod
    public void clearKeychain (String key, Promise promise) {
        setKeychainString("", key, promise);
    }

    @ReactMethod
    public void getKeychainStringWithFingerprint (String key, String prompt, Promise promise) {

        getKeychainString(key, prompt, new GetKeychainCallbacks() {
            @Override
            public void onSuccess(String value) {
                promise.resolve(value);
            }

            @Override
            public void onClose() {
                promise.reject("ErrorFingerprintNoLogin");
            }

            @Override
            public void onError() {
                promise.reject("ErrorFingerprintError");
            }
        });
    }

    private void getKeychainString (String key, String prompt, GetKeychainCallbacks callbacks) {
        try {
            mSubscription = mWhorlwind.read(key)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(result -> {
                        switch (result.readState) {
                            case NEEDS_AUTH:
                                // An encrypted value was found, prompt for fingerprint to decrypt.
                                // The fingerprint reader is active.
                                showFingerPrintDialog(prompt, callbacks);
                                break;
                            case UNRECOVERABLE_ERROR:
                            case AUTHORIZATION_ERROR:
                            case RECOVERABLE_ERROR:
                                // Show an error message. One may be provided in result.message.
                                // Unless the state is UNRECOVERABLE_ERROR, the fingerprint reader is still
                                // active and this stream will continue to emit result updates.
                                fingerprintDialogError("Error reading finger");
                                break;
                            case READY:
                                if (result.value != null) {
                                    // Value was found and has been decrypted.
                                    fingerprintDialogAuthenticated(result.value.utf8(), callbacks);
                                } else {
                                    // No value was found. Fall back to password or fail silently, depending on
                                    // your use case.
                                    fingerprintDialogError("No fingerprint login key");
                                    if (mFingerprintDialog != null) {
                                        mFingerprintDialog.dismiss();
                                        mFingerprintDialog = null;
                                    }
                                    callbacks.onError();
                                }
                                Handler handler = new Handler();
                                handler.postDelayed(new Runnable() {
                                    @Override
                                    public void run() {
                                        mSubscription = null;
                                    }
                                }, 100);

                                break;
                            default:
                                throw new IllegalArgumentException("Unknown state: " + result.readState);
                        }
                    }, throwable -> {
                        Log.e("ERROR", "getKeyChainString:subscribe threw onError", throwable);
                    });
        } catch (Exception e) {
            Log.e("ERROR", "getKeyChainString:subscribe threw error");
        }
    }

    private interface GetKeychainCallbacks {
        void onSuccess(String value);
        void onClose();
        void onError();
    }

    private boolean isFingerprintAvailable() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return ActivityCompat.checkSelfPermission(AppContext, Manifest.permission.USE_FINGERPRINT) == PackageManager.PERMISSION_GRANTED &&
                    AppContext.getSystemService(FingerprintManager.class).isHardwareDetected();
        } else {
            return FingerprintManagerCompat.from(AppContext).isHardwareDetected();
        }
    }

    private boolean checkHardwareSupport() {
        if (mStorage == null || mActivity == null || mWhorlwind == null) {
            mStorage = new SharedPreferencesStorage(getReactApplicationContext(), "co.airbitz.airbitz.storage");
            mActivity = getCurrentActivity();
            mWhorlwind = Whorlwind.create(mActivity, mStorage, "AirbitzKeyStore");
            if (mWhorlwind != null && mWhorlwind.canStoreSecurely()) {
                if(isFingerprintAvailable() && !RootChecker.isDeviceRooted()) {
                    mHasSecureElement = true;
                }
            }
        }
        return mHasSecureElement;
    }

    private void showFingerPrintDialog(String promptString, GetKeychainCallbacks callbacks) {
        mFingerprintDialog = new MaterialDialog.Builder(mActivity)
                .title(promptString)
                .customView(R.layout.fingerprint_dialog_container, false)
                .negativeText(android.R.string.cancel)
                .autoDismiss(false)
                .cancelable(false)
                .onNegative(new MaterialDialog.SingleButtonCallback() {
                    @Override
                    public void onClick(@NonNull MaterialDialog materialDialog, @NonNull DialogAction dialogAction) {
                        materialDialog.cancel();
                        if (mSubscription != null) {
                            mSubscription.unsubscribe();
                            mSubscription = null;
                        }
                        callbacks.onClose();
                    }
                }).build();

        mFingerprintDialog.show();
        final View v = mFingerprintDialog.getCustomView();
        assert v != null;

        mFingerprintIcon = (ImageView) v.findViewById(R.id.fingerprint_icon);
        mFingerprintStatus = (TextView) v.findViewById(R.id.fingerprint_status);
        mFingerprintStatus.setText(R.string.fingerprint_hint);
        mFingerprintStatus.setTextColor(ContextCompat.getColor(mActivity, R.color.dark_text_hint));

    }

    Runnable mResetErrorTextRunnable = new Runnable() {
        @Override
        public void run() {
            if (mActivity == null) return;
            if (mFingerprintStatus != null) {
                mFingerprintStatus.setTextColor(ContextCompat.getColor(mActivity, R.color.dark_text_hint));
                mFingerprintStatus.setText(R.string.fingerprint_hint);
            }
            if (mFingerprintIcon != null) {
                mFingerprintIcon.setImageResource(R.drawable.ic_fp_40px);
            }
        }
    };

    public void fingerprintDialogAuthenticated(String value, GetKeychainCallbacks callbacks) {
        if (mFingerprintStatus != null) {
            mFingerprintStatus.removeCallbacks(mResetErrorTextRunnable);
            mFingerprintStatus.setTextColor(ContextCompat.getColor(mActivity, R.color.dark_text_hint));
            mFingerprintStatus.setText(mActivity.getString(R.string.fingerprint_success));
        }

        if (mFingerprintIcon != null) {
            mFingerprintIcon.setImageResource(R.drawable.ic_fingerprint_success);
            mFingerprintIcon.postDelayed(new Runnable() {
                @Override
                public void run() {
//                mCallback.onFingerprintDialogAuthenticated();
                    mFingerprintDialog.dismiss();
                    callbacks.onSuccess(value);
                }
            }, SUCCESS_DELAY_MILLIS);
        }
    }

    private void fingerprintDialogError(CharSequence error) {
        if (mActivity == null) return;
        if (mFingerprintIcon != null) {
            mFingerprintIcon.setImageResource(R.drawable.ic_fingerprint_error);
        }

        if (mFingerprintStatus != null) {
            mFingerprintStatus.setText(error);
            mFingerprintStatus.setTextColor(ContextCompat.getColor(mActivity, R.color.warning_color));
            mFingerprintStatus.removeCallbacks(mResetErrorTextRunnable);
            mFingerprintStatus.postDelayed(mResetErrorTextRunnable, ERROR_TIMEOUT_MILLIS);
        }
    }
}
