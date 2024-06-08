# Loro Migrate

Convert Loro snapshot from versions older than v0.16 to the latest version.

## Usage

```bash
npx loro-migrate /path/old-snapshot /path/new-snapshot
```

```ts
import { migrate } from "loro-migrate";

const oldSnapshot: Uint8Array = ......;
const newSnapshot: Uint8Array = migrate(oldSnapshot);

```
