- all screens should be created in `app` directory only.
- use `()` to exclude the folder name in url. e.g `/home/(feed)/screen.tsx` -> url becomes `/home/screen.tsx`
- if `Link` contents is more than a simple text, then we can use `asChild` attribute to render the child as link
- `Dynamic Paths`: let's say there're multiple users. So, instead of creating a screen for every user, we can create only one screen & display the details of that specific user.
- dynamic routing is done by renaming the file as `[user_name].tsx` & we can use `useSearchParams` to extract the details. (of that specific user)

### _layout.tsx
- `_layout.tsx` for shared UI elements across screens
- if u want to do something for all the screens, you can do that in `_layout.tsx` file
- we can have layouts for each folder

###
- `useFocusEffect` similar to `useEffect` but for screens (when screens are focused/changed)

###
- for recording videos, you also need Microphone permission:
```typescript
import {useMicrophonePermissions, useCameraPermissions} from 'expo-camera'
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
