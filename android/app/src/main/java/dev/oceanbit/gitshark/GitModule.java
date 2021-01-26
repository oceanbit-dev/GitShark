package dev.oceanbit.gitshark;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import dev.oceanbit.gitshark.Git.GitCheckout;
import dev.oceanbit.gitshark.Git.GitClone;
import dev.oceanbit.gitshark.Git.GitGetFileStateChanges;
import dev.oceanbit.gitshark.Git.GitGetTrackedBranch;
import dev.oceanbit.gitshark.Git.GitLog;
import dev.oceanbit.gitshark.Git.GitPull;
import dev.oceanbit.gitshark.Git.GitPush;
import dev.oceanbit.gitshark.Git.GitReadCommit;
import dev.oceanbit.gitshark.Git.GitResetPaths;
import dev.oceanbit.gitshark.Git.GitRevList;
import dev.oceanbit.gitshark.Git.GitStatus;

public class GitModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    GitModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void clone(String uri, String path,
                      Promise promise) {
        GitClone clone = new GitClone(reactContext);

        new Thread(new Runnable() {
            @Override
            public void run() {
                clone.clone(uri, path, promise);
            }
        }).start();
    }

    @ReactMethod
    public void checkout(String path, String name, String newBranch, Promise promise) {
        GitCheckout gitCheckout = new GitCheckout(reactContext);

        gitCheckout.checkout(path, name, newBranch, promise);
    }

    @ReactMethod
    public void gitLog(String path, Promise promise) {
        gitLog(path, "", promise);
    }

    @ReactMethod
    public void gitLog(String path, String oidRef, Promise promise) {
        GitLog.gitLog(path, oidRef, promise);
    }

    @ReactMethod
    public void getFileStateChanges(String path, String commit1, String commit2, Promise promise) {
        GitGetFileStateChanges.getFileStateChanges(path, commit1, commit2, promise);
    }

    @ReactMethod
    public void readCommit(String path, String oid, Promise promise) {
        GitReadCommit.readCommit(path, oid, promise);
    }

    @ReactMethod
    public void resetPaths(String path, ReadableArray files, Promise promise) {
        GitResetPaths.restPaths(path, files, promise);
    }

    @ReactMethod
    public void pull(
            String path,
            String remote,
            String remoteRef,
            String authToken,
            Promise promise
    ) {
        GitPull gitPull = new GitPull(reactContext);
        gitPull.pull(path, remote, remoteRef, authToken, promise);
    }


    @ReactMethod
    public void push(
            String path,
            String remote,
            String remoteRef,
            String authToken,
            Boolean forcePush,
            Promise promise
    ) {
        GitPush gitPush = new GitPush(reactContext);
        gitPush.push(path, remote, remoteRef, authToken, forcePush, promise);
    }


    @ReactMethod
    public void revList(String path, String branch1Ref, String branch2Ref, Promise promise) {
        GitRevList.revList(path, branch1Ref, branch2Ref, promise);
    }


    @ReactMethod
    public void status(String path, Promise promise) {
        GitStatus.status(path, promise);
    }

    @ReactMethod
    public void getTrackedBranch(
            String path,
            String branchName,
            Promise promise
    ) {
        GitGetTrackedBranch.getTrackedBranch(path, branchName, promise);
    }

    @NonNull
    public String getName() {
        return "GitModule";
    }
}
