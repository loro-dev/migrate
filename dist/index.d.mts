declare enum LoroVersion {
    V015 = 0,
    V016 = 1,
    V1_0 = 2
}
declare const migrate: (inputSnapshot: Uint8Array, from: LoroVersion) => Uint8Array;

export { LoroVersion, migrate };
