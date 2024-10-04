import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getGrid' : ActorMethod<[], Array<Array<boolean>>>,
  'initializeGame' : ActorMethod<[], Array<Array<boolean>>>,
  'randomizeCells' : ActorMethod<[], Array<Array<boolean>>>,
  'updateGame' : ActorMethod<[], Array<Array<boolean>>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
