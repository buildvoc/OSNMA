export interface OSNMA {
    metadata:                Metadata;
    OSNMA_status:            OSNMAStatus;
    OSNMA_material_received: { [key: string]: OSNMAMaterialReceived };
    nav_data_received:       { [key: string]: NavDataReceived };
    verified_OSNMA_material: VerifiedOSNMAMaterial;
    authenticated_nav_data:  { [key: string]: { [key: string]: AuthenticatedNavDatum } };
}

export interface OSNMAMaterialReceived {
    hkroot_data: HkrootData;
    mack_data:   MackData;
}

export interface HkrootData {
    nma_header:      Nma;
    dsm_header:      DsmHeader | null;
    dsm_block_pages: boolean[];
}

export interface DsmHeader {
    dsm_id:   number;
    block_id: number;
}

export interface Nma {
    nmas: "OPERATIONAL";
    cid:  number;
    cpks: "NOMINAL";
}

export interface MackData {
    tags:      Array<Array<MacltSequence | number> | null>;
    tesla_key: null | string;
}

export type MacltSequence = "FLX" | "00S" | "04S" | "12S" | "00E" | "12E";

export interface OSNMAStatus {
    nma_status:           Nma;
    tesla_chain_in_force: TeslaChainInForce;
    public_key_in_force:  PublicKeyInForce;
}

export interface PublicKeyInForce {
    npkid: number;
    npkt:  "ECDSA_P256";
    mid:   number;
}

export interface TeslaChainInForce {
    pkid:           number;
    cidkr:          number;
    hf:             "SHA_256";
    mf:             "HMAC_SHA_256";
    ks:             number;
    ts:             number;
    maclt:          number;
    maclt_sequence: Array<MacltSequence[]>;
}

export interface AuthenticatedNavDatum {
    [x: string]: any;
    iod:        null | string;
    start_gst:  number[];
    last_gst:   number[];
    acc_length: number;
}

export interface Metadata {
    GST_subframe:    number[];
    input_module:    "SBFLiveServer";
    OSNMAlib_status: "STARTED";
}

export interface NavDataReceived {
    IOD:   string;
    ADKD0: { [key: string]: boolean };
    ADKD4: { [key: string]: boolean | null };
}

export interface VerifiedOSNMAMaterial {
    tesla_key:  TeslaKey[];
    macseq:     Macseq[];
    tags:       TagClass[];
    last_kroot: LastKroot;
    last_pkr:   LastPkr;
}

export interface LastKroot {
    verification: boolean;
    nma_header:   NmaHeader;
    fields:       LastKrootFields;
}

export interface LastKrootFields {
    nb_dk:     number[];
    pkid:      Array<number | null>;
    cidkr:     Array<number | null>;
    reserved1: Array<number | null>;
    hf:        Array<"SHA_256" | number>;
    mf:        Array<"HMAC_SHA_256" | number>;
    ks:        number[];
    ts:        number[];
    maclt:     Array<number | null>;
    reserved2: Array<number | null>;
    wn_k:      Array<number | null>;
    towh_k:    number[];
    alpha:     Array<"1d2f2bc51851" | null>;
    kroot:     Array<"986dd8da5c8948ec5f3583f2e5ac6a83" | null>;
    ds:        Array<null | string>;
    p_dk:      Array<null | string>;
}

export interface NmaHeader {
    nmas:          Array<"OPERATIONAL" | number>;
    cid:           Array<number | null>;
    cpks:          Array<"NOMINAL" | number>;
    reserved_nmah: Array<number | null>;
}

export interface LastPkr {
    verification:     boolean;
    merkle_tree_root: "832e15ede55655eac6e399a539477b7c034cce24c3c93ffc904acd9bf842f04e";
    fields:           LastPkrFields;
}

export interface LastPkrFields {
    nb_dp: number[];
    mid:   Array<number | null>;
    itn1:  Array<"941bd34ea7df668b6fc5be75c1d93464d109bc615cb52c8124847fafb09cbb2b" | null>;
    itn2:  Array<"6aafde28017bf0744d42819ce40e3a0cda1eca3f7a4ea67e134e7aa714c1e843" | null>;
    itn3:  Array<"de73d209e4c5bcdc34cd117f2fe40fd08b110009997ad2b3291d3a2cf29943f9" | null>;
    itn4:  Array<"84de3669e6da551292979e5b8d045787fa967c57cc23638a30237614edd9171a" | null>;
    npkt:  Array<"ECDSA_P256" | number>;
    npkid: Array<number | null>;
    npk:   Array<null | string>;
    p_dp:  Array<null | string>;
}

export interface Macseq {
    prn_a:        number;
    flex_tags:    Array<Array<MacltSequence | number>>;
    verification: boolean;
    GST:          number[];
}

export interface TagClass {
    prn_a:        number;
    prn_d:        number;
    adkd:         number;
    cop:          number;
    flx:          boolean;
    verification: boolean;
    GST:          number[];
}

export interface TeslaKey {
    svid:          number;
    value:         string;
    verification:  boolean;
    GST:           number[];
    reconstructed: boolean;
}
