# Loro Migrate

Convert Loro snapshot from versions older than v1.0 to the latest version.

## Usage

```bash
npx loro-migrate /path/old-snapshot /path/new-snapshot v0.16
```

```ts
import { migrate, LoroVersion } from "loro-migrate";

const oldSnapshot: Uint8Array = ......;
const newSnapshot: Uint8Array = migrate(oldSnapshot, LoroVersion.V016 );

```
