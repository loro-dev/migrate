import { Loro as LoroV15 } from "loro-crdt-old";
import { Loro as LoroV16 } from "loro-crdt";

export const migrate = (inputSnapshot: Uint8Array): Uint8Array => {
  const loro = new LoroV15();
  loro.import(inputSnapshot);
  // @ts-ignore
  const jsonObj = loro.exportJsonUpdates();
  const loroNew = new LoroV16();
  // @ts-ignore
  loroNew.importJsonUpdates(jsonObj);
  return loroNew.exportSnapshot();
};
