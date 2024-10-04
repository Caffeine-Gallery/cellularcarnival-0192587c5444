export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getGrid' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Bool))], ['query']),
    'initializeGame' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Bool))], []),
    'randomizeCells' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Bool))], []),
    'updateGame' : IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Bool))], []),
  });
};
export const init = ({ IDL }) => { return []; };
