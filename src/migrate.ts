import { Loro as LoroV15 } from "loro-crdt-v015";
import { Loro as LoroV16 } from "loro-crdt-v016";
import { LoroDoc, JsonSchema } from "loro-crdt";

export enum LoroVersion {
  V015 = 0,
  V016,
  V1_0,
}

export const migrate = (
  inputSnapshot: Uint8Array,
  from: LoroVersion
): Uint8Array => {
  if (from >= LoroVersion.V1_0) {
    throw "`from` version should be smaller than `v1.0` version";
  }
  let jsonOld;
  switch (from) {
    case LoroVersion.V015:
      const loro15 = new LoroV15();
      loro15.import(inputSnapshot);
      jsonOld = loro15.exportJsonUpdates();
      break;
    case LoroVersion.V016:
      const loro16 = new LoroV16();
      loro16.import(inputSnapshot);
      jsonOld = loro16.exportJsonUpdates();
      break;
    case LoroVersion.V1_0:
      throw "the loro version of `from` should not be `v1.0`";
  }

  const doc = new LoroDoc();
  doc.importJsonUpdates(jsonOld as JsonSchema);
  return doc.export({ mode: "snapshot" });
};
