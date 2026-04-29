- all screens should be created in `app` directory only.
- use `()` to exclude the folder name in url. e.g `/home/(feed)/screen.tsx` -> url becomes `/home/screen.tsx`
- if `Link` contents is more than a simple text, then we can use `asChild` attribute to render the child as link
- `Dynamic Paths`: let's say there're multiple users. So, instead of creating a screen for every user, we can create only one screen & display the details of that specific user.
- dynamic routing is done by renaming the file as `[user_name].tsx` & we can use `useSearchParams` to extract the details. (of that specific user)

### \_layout.tsx

- `_layout.tsx` for shared UI elements across screens
- if u want to do something for all the screens, you can do that in `_layout.tsx` file
- we can have layouts for each folder

###

- `useFocusEffect` similar to `useEffect` but for screens (when screens are focused/changed)

###

- for recording videos, you also need Microphone permission:

```typescript
import { useMicrophonePermissions, useCameraPermissions } from "expo-camera";
const [permissionMic, requestMicPermission] = useMicrophonePermissions();
const [permissionCam, requestCameraPermission] = useCameraPermissions();

useEffect(() => {
  // permission have been fetched & not granted & can ask again
  if (permissionCam && !permissionCam.granted && permissionCam.canAskAgain) {
    requestCameraPermission();
  }

  if (permissionMic && !permissionMic.granted && permissionMic.canAskAgain) {
    requestMicPermission();
  }
}, [permissionCam, permissionMic]);
```

# New SDK 55 APIs

```javascript
new File(Paths.document, fileName).create();
```

- the above code simply creates an empty file with nothing in it.

### creating a file and moving data to it.

```javascript
const cachedFile = new File(fullURI); // instance of the file at fullURI

const fileName = path.parse(uri).base; // path comes from node:fs

const documentFile = new File(Paths.document, fileName); // instance of a file in app's document directory, file isn't saved yet
documentFile.create(); // file is saved
const imageData = await cachedFile.arrayBuffer(); // cachedFile data in binary format
documentFile.write(new Uint8Array(imageData)); // copy the cachedFile data
```

#

```
Stack.screen -> name: filename
options: {
  presentation
  sheetAllowedDetents: [0.3, 0.5, 0.75]
  Sheetgrabbervisible: true
  headershown:
}
```

###

- to delay a sync fn, wrap it in `setTimeout(fn, 0)` , e.g `setTimeout(() => loadMediaFiles(), 0)`
- `preferHighDynamicRange` for rendering HDR images
