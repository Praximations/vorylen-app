# Vorylen App

Expo/React Native mobile interface to the same Vorylen API used by Web and Desktop. Routes in `src/app` provide sign-in, organization selection, shared project creation/listing, Dev projects, Finance summaries and capability discovery. `src/device` owns secure session storage; `src/state` owns local presentation state. Business rules and permissions stay in `praximation-api`.

Copy `.env.example` to `.env` and supply the reachable API URL plus the existing public Supabase URL/anon key. Never use a service-role key. On a physical phone, localhost refers to the phone. Run `npm ci` and `npm start`; use Expo Go or a development build on your device.

Checks: `npm run typecheck`, `npm run lint`, `npm run export:native`. `npm run native:generate` generates native Android/iOS projects from `app.json`; these generated directories are ignored. Native compilation requires Android tooling or macOS/Xcode. `eas.json` defines preview and production cloud builds, which require your Expo account and signing configuration.

Both native apps consume the same compiled `@praximations/client` artifact, maintained in `vorylen-api/packages/client`. It transports authenticated requests and does not duplicate the backend's domain code. Existing organization provisioning is still performed through Web.
