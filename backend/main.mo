import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Random "mo:base/Random";
import Time "mo:base/Time";

actor {
  // Grid size
  let rows : Nat = 50;
  let cols : Nat = 50;

  // Game state
  stable var grid : [[Bool]] = Array.tabulate(rows, func(_ : Nat) : [Bool] {
    Array.tabulate(cols, func(_ : Nat) : Bool { false })
  });

  // Initialize the game with random cells
  public func initializeGame() : async [[Bool]] {
    let seed = await Random.blob();
    let rng = Random.Finite(seed);
    grid := Array.tabulate(rows, func(_ : Nat) : [Bool] {
      Array.tabulate(cols, func(_ : Nat) : Bool {
        switch (rng.coin()) {
          case (null) { false };
          case (?b) { b };
        }
      })
    });
    grid
  };

  // Update the game state
  public func updateGame() : async [[Bool]] {
    let newGrid = Array.tabulate(rows, func(i : Nat) : [Bool] {
      Array.tabulate(cols, func(j : Nat) : Bool {
        let neighbors = countNeighbors(i, j);
        if (grid[i][j]) {
          neighbors == 2 or neighbors == 3
        } else {
          neighbors == 3
        }
      })
    });
    grid := newGrid;
    grid
  };

  // Count live neighbors for a cell
  private func countNeighbors(row : Nat, col : Nat) : Nat {
    var count = 0;
    for (i in [-1, 0, 1].vals()) {
      for (j in [-1, 0, 1].vals()) {
        if (i != 0 or j != 0) {
          let newRow = Int.abs((Int.abs(row) + rows + i) % Int.abs(rows));
          let newCol = Int.abs((Int.abs(col) + cols + j) % Int.abs(cols));
          if (grid[newRow][newCol]) {
            count += 1;
          }
        }
      }
    };
    count
  };

  // Randomize cells
  public func randomizeCells() : async [[Bool]] {
    let seed = await Random.blob();
    let rng = Random.Finite(seed);
    grid := Array.tabulate(rows, func(i : Nat) : [Bool] {
      Array.tabulate(cols, func(j : Nat) : Bool {
        switch (rng.coin()) {
          case (null) { false };
          case (?b) { b };
        }
      })
    });
    grid
  };

  // Get current grid state
  public query func getGrid() : async [[Bool]] {
    grid
  };
}
